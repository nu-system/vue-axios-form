<template>
    <form :action="action" :method="method" @submit.prevent="submit">
        <slot/>
        <slot v-if="formStatus" :name="formStatus"/>
    </form>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'NuAxiosForm',
        data() {
            return {
                formStatus: this.status
            }
        },
        props: {
            /** 是否默认触发表单提交 */
            defaultSubmit: {
                type: Boolean,
                default: false
            },
            /** 状态 */
            status: {
                type: String,
                default: null
            },
            /** ajax url */
            action: String,
            /** ajax 方式 */
            method: {
                type: String,
                default: 'get',
                validator: function (value) {
                    // 这个值必须匹配下列字符串中的一个
                    return ['get', 'post'].indexOf(value) !== -1
                }
            },
            /** ajax 参数 */
            params: {
                type: Object,
                default: null
            },
            config: {
                type: Object,
                default: null
            }
        },
        mounted() {
            this.defaultSubmit && this.submit();
        },
        methods: {
            changeStatus(status) {
                this.formStatus = status;
            },
            submit() {
                const _it = this;
                const {params, method, action, config} = this;
                if (!action) {
                    return;
                }
                this.changeStatus('loading');
                axios.request({
                    url: action,
                    method: method,
                    params: params,
                    ...config
                })
                    .then(function (response) {
                        _it.changeStatus('success');
                        _it.$emit('onSuccess', response);
                    })
                    .catch(function (error) {
                        _it.changeStatus('error');
                        _it.$emit('onError', error);
                    });
            }
        }
    }
</script>
