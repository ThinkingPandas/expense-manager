import React from 'react';
import './modal.style.scss';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: props.className || '',
      title: props.title || 'Title',
      onClose: props.onClose,
      children: props.children,
      onSave: props.onSave,
      onSaveText: props.onSaveText || 'SAVE',
    };
  }

  render() {
    let {className, onClose, children, title, onSave, onSaveText} = this.state;
    return (
      <div className={`em-expense-modal ${className}`}>
        <div className="paper-modal">
          <div className="title-bar row mx-0 mb-1">
            <h4>{title}</h4>
          </div>
          <div className="mb-4 mt-2">{children}</div>
          <div className="action-bar row mx-0 justify-content-end">
            <div className="col-auto">
              <div className="btn button-sucess" onClick={onSave}>
                <small>{onSaveText}</small>
              </div>
            </div>
            <div className="col-auto px-0">
              <div className="btn button-danger" onClick={onClose}>
                <small>CANCEL</small>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay" onClick={onClose}>
        </div>
      </div>
  );
}
}

export default Modal;
