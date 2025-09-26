import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false
        }
    }

    // handle doubleclicks
    handleClick = (event) => {
        if (event.detail === 2) {
            event.preventDefault();
            event.stopPropagation();
            this.handleEditSong();
        }
    }

    handleDeleteSong = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const songIndex = parseInt(this.getItemNum()) - 1;
        this.props.deleteSongCallback(songIndex);
    }

    handleEditSong = () => {
        const songIndex = parseInt(this.getItemNum()) - 1;
        this.props.editSongCallback(songIndex, this.props.song);
    }

    handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
        this.setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo
        }));
    }

    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }

    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }

    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }

    handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false
        }));

        // ASK THE MODEL TO MOVE THE DATA
        this.props.moveCallback(sourceId, targetId);
    }

    getItemNum = () => {
        return this.props.id.substring("song-card-".length);
    }

    render() {
        const { song } = this.props;
        let num = this.getItemNum();
        console.log("num: " + num);
        let itemClass = "song-card";
        if (this.state.draggedTo) {
            itemClass = "song-card-dragged-to";
        }
        return (
            <div
                id={'song-' + num}
                className={itemClass}
                onClick={this.handleClick}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                draggable="true"
            >
                <div className="song-card-content">
                    <span className="song-card-number">
                        {num}.
                    </span>
                    <span className="song-card-title">
                        <a
                            className="song-card-link"
                            href={`https://www.youtube.com/watch?v=${song.youTubeId}`}
                            target="_blank"
                            rel="noopener noreffer"
                        >
                            {song.title}
                        </a>
                    </span>
                    {"\u00A0"}
                    <span className="song-card-year">
                        ({song.year})
                    </span>
                    {"\u00A0"}
                    <span className="song-card-artist">
                        by {song.artist}
                    </span>
                </div>
                <input
                    type="button"
                    className="song-card-button"
                    onClick={this.handleDeleteSong}
                    value="🗑"
                />
            </div>
        )
    }
}