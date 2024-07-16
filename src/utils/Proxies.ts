import { v4 as uuidv4 } from 'uuid';

export type BackendResponse<TypeVar> = {
  success: Boolean;
  code: string;
  result: TypeVar;
};

class Proxies {
  iwn_wait_for_first_iframe_registration_promise_hash = {};
  iwn_first_iframe_registration_resolver_hash = {};
  iwn_window_wraps = {};
  iwn_windows = {};
  iwn_listener_was_added_flag = false;
  resolvers: any = {};
  //
  create_proxy_from_iframe_name<TargetType>(extension_id, iframe_name: string) {
    this.iwn_wait_for_first_iframe_registration_promise_hash[iframe_name] = new Promise((r) => {
      this.iwn_first_iframe_registration_resolver_hash[iframe_name] = r;
    });
    if (this.iwn_listener_was_added_flag === false) {
      this.iwn_listener_was_added_flag = true;
      let listener = (event) => {
        if (event.data && event.data.name === 'register_iframe') {
          const { iframe_name, extension_id: event_extension_id } = event.data.data;
          if (event_extension_id === extension_id) {
            let iframe_window = event.source;
            this.iwn_windows[iframe_name] = event.source;
            this.iwn_window_wraps[iframe_name] = this.create_window_wrap(event_extension_id, window, iframe_window);
            this.iwn_first_iframe_registration_resolver_hash[iframe_name]();
          }
        }
      };
      window.addEventListener('message', listener);
    }
    //
    let _this = this;
    let proxy = new Proxy(
      {},
      {
        get(target, prop) {
          return async (...args: any[]) => {
            let name = prop;
            let data = args;
            if (name === 'get_window') {
              // return () => {
              return _this.iwn_windows[iframe_name];
              // };
            } else {
              await _this.iwn_wait_for_first_iframe_registration_promise_hash[iframe_name];
              let wrap = _this.iwn_window_wraps[iframe_name];
              return wrap.exec(name, data);
            }
          };
        },
      }
    );
    return proxy as TargetType;
  }
  create_window_proxy<TargetType>(extension_id, window_this, window_target) {
    let wrap = this.create_window_wrap(extension_id, window_this, window_target);
    let proxy = new Proxy(
      {},
      {
        get(target, prop) {
          return async (...args: any[]) => {
            return wrap.exec(prop.toString(), args);
          };
        },
      }
    );
    return proxy as TargetType;
  }
  create_window_wrap(extension_id, window_this, window_target) {
    window_this.addEventListener('message', async (event) => {
      if (event.data) {
        let name = event.data.name;
        let meta = event.data.meta;
        let data = event.data.data;
        if (name === 'exec_result' && meta && meta.response && this.resolvers[meta.request_id]) {
          this.resolvers[meta.request_id](data.result);
          delete this.resolvers[meta.request_id];
        }
      }
    });
    return {
      exec: (name, data?: any) => {
        return new Promise((r) => {
          let request_id = uuidv4();
          this.resolvers[request_id] = r;
          let meta = {
            request_id,
            request: true,
            extension_id,
          };
          window_target.postMessage({ name, meta, data }, '*');
        });
      },
    };
  }
  create_window_api(extension_id, instance, allowed_origin) {
    window.addEventListener('message', async (event) => {
      if (event.data) {
        let name = event.data.name;
        let meta = event.data.meta;
        let data = event.data.data;
        if (
          //
          (event.origin === allowed_origin || allowed_origin === '*') &&
          meta &&
          meta.extension_id === extension_id &&
          instance[name]
        ) {
          var result: any = null;
          if (name === 'ping') {
            console.log('PING', window);
            result = 'pong';
          } else {
            try {
              result = await instance[name].apply(instance, data);
            } catch (e) {
              console.log('proxy_error', e);
              result = null;
            }
          }
          if (event.source) {
            let source = event.source as Window;
            source.postMessage(
              {
                name: 'exec_result',
                meta: {
                  response: true,
                  request_id: meta.request_id,
                },
                data: { result },
              },
              allowed_origin
            );
          }
        }
      }
    });
  }
}
export default new Proxies();
