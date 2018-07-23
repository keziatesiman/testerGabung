import { observable, action } from 'mobx';


class MainStore {
    @observable mainState = {
        appName: 'Conneq',
        versionApp: '1.0.0'
    }
    @action setVersionApp(currentVersionApp){
        this.mainState.versionApp = currentVersionApp
    }
}

export default new MainStore()
