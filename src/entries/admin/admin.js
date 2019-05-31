import dva from 'dva'
import Models from 'Models'
import {createHashHistory} from 'history'
import createLoading from "dva-loading";

// 1. Initialize
const history = createHashHistory()
const app = dva({history});

// 2. Plugins
// app.use({});
app.use(createLoading())

// 3. Model
Models.forEach(m => {
    app.model(m)
});

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');