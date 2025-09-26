import { jsTPS_Transaction } from "jstps";

export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initSongIndex, initSong) {
        super();
        this.app = initApp;
        this.songIndex = initSongIndex;
        this.song = { ...initSong }; // Deep copy
    }

    executeDo() {
        this.app.deleteSong(this.songIndex);
    }
    
    executeUndo() {
        this.app.addSongAtIndex(this.songIndex, this.song);
    }
}