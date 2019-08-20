import NuAxiosForm from "./index.vue";

/* istanbul ignore next */
NuAxiosForm.install = function(Vue) {
    Vue.component(NuAxiosForm.name, NuAxiosForm);
};

export default NuAxiosForm;
