import React from 'react';
import { inject, observer } from 'mobx-react';
import '../App.scss';

import HeaderComponent from '../components/Header/Header.component.js';

@inject('categoryStore')
@observer
class CategoryContainer extends React.Component {
  async componentWillMount() {
    const { fetchAll } = this.props.categoryStore;
    await fetchAll();
  }

  render() {
    const { categoriesList } = this.props.categoryStore;

    return (
      <div className="ExpenseManager">
        <HeaderComponent />
        <div className="em-body">
          <div className="em-category row mx-0 my-3">
            <div className="col-12">
              <h4>CATEGORIES</h4>
              {categoriesList.length ? (
                <div>
                  {categoriesList.map((r, i) => (
                    <div className="category-entry row mx-0 mb-2">
                      <div className="col-md-10 col-9 px-1">
                        <div>
                          <span className="font-weight-bold">{r.title}</span>
                        </div>
                        <div>
                          <small>{r.description}</small>
                        </div>
                      </div>
                      <div className="col-md-2 col-3 d-flex justify-content-between flex-column px-1">
                        <div className="row mx-0 justify-content-end">
                          <div
                            className="circle-btn"
                            onClick={() =>
                              this._handleControlModal('editCategory', 'open')
                            }
                          >
                            <span class="material-icons">edit</span>
                          </div>
                          <div
                            className="circle-btn"
                            onClick={() =>
                              this._handleControlModal('deleteCategory', 'open')
                            }
                          >
                            <span class="material-icons">delete</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="d-flex my-5 p-5 justify-content-center align-items-center">
                  <h6 className="text-muted">NO CATEGORY DATA</h6>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryContainer;
