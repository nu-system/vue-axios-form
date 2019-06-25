# nu-axios-form-vue

一个基于 axios 利用 Form 表单的 dom 结构， 发送 request 请求的组件。

## Setup

```bash
$ npm i @y-fe/nu-axios-form-vue

// or yarn
$ yarn add @y-fe/nu-axios-form-vue
```


## Usage

```vue
<template>
    <div>
        <NuAjaxForm
            action="//www.mocky.io/v2/5cee2090300000013a6e98c9?mocky-delay=1000ms"
            @onSuccess="handelSuccess"
        >
            <p>click the button below will send a request and get a respones after 1000ms</p>
            <button type="submit">click and send a request</button>
            <span slot="success">request success</span>
            <span slot="loading">loading...</span>
            <span slot="error">error</span>
        </NuAjaxForm>
    </div>
</template>
<script>
    import NuAjaxForm from "@y-fe/nu-axios-form-vue"    
    export default {
        components: { NuAjaxForm },
        methods: {
            handelSuccess(response) {
                console.log('handelSuccess', response);
            }
        }
    }
</script>
```

<ClientOnly>
<AxiosFormDemo/>
</ClientOnly>

你只需要写一个完整的 form 表单，就可以实现一个 request 请求，并且监听到整个的生命周期。

## Api

| props   |      类型      | 默认值  | 介绍 |
|:----------|:-------------|:------:|------:|
| [:defaultSubmit](#defaultSubmit) |  Boolean | false | 是否初始化的时候就发送 request 请求 |
| [:status](#status) |  string | null | request status |
| [:action](#action) |  String | - | server URL that will be used for the request |
| :method | String | 'get' | request method  |
| :params | Object | null | URL parameters to be sent with the request |
| :config | Object | null | [axios](https://github.com/axios/axios) config |
| @onSuccess | Function | return response | callback when request get response |
| @onError | Function | return error | callback when request error |

### defaultSubmit

```jsx
<NuAjaxForm :defaultSubmit="true" />
```

只需将 `defaultSubmit` 设置为 `true`, `NuAjaxForm`一但创建 request 请求就默认触发。

### status

```jsx 
<NuAjaxForm status="placeholder">
    <span slot="placeholder">placeholder</span>
    <span slot="success">request success</span>
    <span slot="loading">loading...</span>
    <span slot="error">error</span>
</NuAjaxForm>
```

- `loading`: 当 request 触发时，status 会被设置为 loading；
- `success`: 当 request 请求成功，status 会被设置为 success；
- `error`: 当 request 请求失败，status 会被设置为 error；

status 名称是什么，NuAjaxForm 内部相同名称的 slot 会显示。

组件内部只会自动切换以上这三个状态。但是你可以为 status 设置任意的文案。

所以在这个事例中只有 `slot="placeholder"` 的 dom 会输出。

```jsx
<NuAjaxForm ref="axioForm" />

this.$refs.axioForm.changeStatus('placeholder');
```

也可以在外面通过触发子组件的 changeStatus 方法来手动更新 status 的值。

### action

虽然 action 并不是 required，但是当 action 不存在时，整个 request 生命周期并不会创建。

### form submit

这里的所有事件都基于表单的 submit 事件，只要表单的 submit 事件被触发，整个 request 流程就会重新触发。

```jsx
<NuAjaxForm ref="axioForm" />

this.$refs.axioForm.submit();
```

所以你可以通过 ref 触发子组件的 submit 事件来触发 requset 请求。


```jsx
<NuAjaxForm ref="axioForm">
    <button type="submit">click and send a request</button>
</NuAjaxForm>
```

也可以通过在 NuAjaxForm 里面放一个  `[type="submit"]` 的按钮，然后点击这个按钮触发 requset 请求。
