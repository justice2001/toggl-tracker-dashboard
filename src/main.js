import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css';
import NumberForm from "./components/form/NumberForm.vue";
import DateForm from "./components/form/DateForm.vue";

const app = createApp(App);

app.component("number-form", NumberForm)
app.component("date-form", DateForm)

app.use(TDesign);
app.mount('#app');
