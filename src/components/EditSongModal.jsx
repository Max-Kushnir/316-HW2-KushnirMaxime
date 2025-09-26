import React, { Component } from 'react';

export default class EditSongModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: '',
            artist: '',
            youTubeId: '',
            year: ''
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.song && this.props.song !== prevProps.song) {
            this.setState({
                title: this.props.song.title || '',
                artist: this.props.song.artist || '',
                youTubeId: this.props.song.youTubeId || '',
                year: this.props.song.year || ''
            });
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleConfirm = () => {
        const { editSongCallback } = this.props;
        const updatedSong = {
            title: this.state.title,
            artist: this.state.artist,
            youTubeId: this.state.youTubeId,
            year: parseInt(this.state.year) || this.state.year
        };
        editSongCallback(updatedSong);
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleConfirm();
        } else if (event.key === 'Escape') {
            this.props.hideEditSongModalCallback();
        }
    }

    render() {
        const { song, hideEditSongModalCallback } = this.props;
        
        if (!song) {
            return null;
        }

        return (
            <div 
                className="modal" 
                id="edit-song-modal" 
                data-animation="slideInOutLeft">
                <div className="modal-root" id='edit-song-root'>
                    <div className="modal-north">
                        Edit Song
                    </div>
                    <div className="modal-center">
                            <div className="modal-prompt">Title:</div>
                            <input
                                type="text"
                                name="title"
                                className="modal-textfield"
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                onKeyDown={this.handleKeyPress}
                                autoFocus
                            />
                            
                            <div className="modal-prompt">Artist:</div>
                            <input
                                type="text"
                                name="artist"
                                className="modal-textfield"
                                value={this.state.artist}
                                onChange={this.handleInputChange}
                                onKeyDown={this.handleKeyPress}
                            />

                            <div className="modal-prompt">Year:</div>
                            <input
                                type="text"
                                name="year"
                                className="modal-textfield"
                                value={this.state.year}
                                onChange={this.handleInputChange}
                                onKeyDown={this.handleKeyPress}
                            />
                            
                            <div className="modal-prompt">YouTube ID:</div>
                            <input
                                type="text"
                                name="youTubeId"
                                className="modal-textfield"
                                value={this.state.youTubeId}
                                onChange={this.handleInputChange}
                                onKeyDown={this.handleKeyPress}
                            />
                    </div>
                    <div className="modal-south">
                            <input 
                                type="button" 
                                id="edit-song-confirm-button" 
                                className="modal-button" 
                                onClick={this.handleConfirm}
                                value='Confirm' 
                            />
                            <input 
                                type="button" 
                                id="edit-song-cancel-button" 
                                className="modal-button" 
                                onClick={hideEditSongModalCallback}
                                value='Cancel' 
                            />
                        </div>
                </div>
            </div>
        );
    }
}