import React from 'react';
import PropTypes from 'prop-types';

class CategoryRow extends React.Component {
  render() {
    const {
      id,
      title,
      description,
      permanent,
      handleClickEditCategory,
      handleClickDeleteCategory,
    } = this.props;

    return (
      <div className="category-entry row mx-0 mb-2">
        <div className="col-md-9 col-8 px-1">
          <div>
            <span className="font-weight-bold">{title}</span>
          </div>
          <div>
            <small>{description}</small>
          </div>
        </div>
        <div className="col-md-3 col-4 d-flex justify-content-between flex-column px-1">
          {!permanent && (
            <div className="row mx-0 justify-content-end">
              <div
                className="circle-btn"
                onClick={() => handleClickEditCategory(id)}
              >
                <span className="material-icons">edit</span>
              </div>
              <div
                className="circle-btn"
                onClick={() => handleClickDeleteCategory(id)}
              >
                <span className="material-icons">delete</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

CategoryRow.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleClickEditCategory: PropTypes.func.isRequired,
  handleClickDeleteCategory: PropTypes.func.isRequired,
};

export default CategoryRow;
