import { jsTPS_Transaction } from "jstps";

export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initSongIndex, initSong) {
        super();
        this.app = initApp;
        this.songIndex = initSongIndex;
        this.song = { ...initSong }; // Deep copy of the song to add
    }

    executeDo() {
        this.app.addSongAtIndex(this.songIndex, this.song);
    }
    
    executeUndo() {
        this.app.deleteSong(this.songIndex);
    }
}