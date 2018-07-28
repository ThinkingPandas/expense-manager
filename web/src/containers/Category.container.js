import React from 'react';
import { inject, observer } from 'mobx-react';
import '../App.scss';

import HeaderComponent from '../components/Header/Header.component.js';
import CategoryRowComponent from '../components/CategoryRow/CategoryRow.component.js';
import CategoryForm from '../components/CategoryForm/CategoryForm.component.js';
import CategoryDeleteConfirmModal from '../components/CategoryDeleteConfirmModal/CategoryDeleteConfirmModal.component.js';

@inject('categoryStore')
@observer
class CategoryContainer extends React.Component {
  state = {
    upsertCategoryModalOpened: false,
    deleteCategoryModalOpened: false,
    editCategoryForm: null,
    deleteCategoryId: null,
  };

  async componentWillMount() {
    const { fetchAll } = this.props.categoryStore;
    await fetchAll();
  }

  handleClickEditCategory = category => {
    this.setState({
      upsertCategoryModalOpened: true,
      editCategoryForm: {
        ...category,
      },
    });
  };

  handleClickDeleteCategory = category => {
    this.setState({
      deleteCategoryModalOpened: true,
      deleteCategoryId: category.id,
    });
  };

  render() {
    const { upsertCategoryModalOpened, deleteCategoryModalOpened, editCategoryForm, deleteCategoryId } = this.state;
    const { categoriesList } = this.props.categoryStore;

    return (
      <div className="CategoryManager">
        <HeaderComponent />
        <div className="em-body">
          <div className="em-category row mx-0 my-3">
            <div className="col-12">
              <div className="category-header">
                <h4>CATEGORIES</h4>
                <button
                  className="btn"
                  disabled={categoriesList.length === 0}
                  onClick={() =>
                    this.setState({
                      editCategoryForm: null,
                      upsertCategoryModalOpened: true,
                    })
                  }
                >
                  <small>CREATE CATEGORY</small>
                </button>
              </div>
              {categoriesList.length ? (
                <div>
                  {categoriesList.map((r, i) => (
                    <CategoryRowComponent
                      key={r.id}
                      {...r}
                      handleClickEditCategory={() =>
                        this.handleClickEditCategory(r)
                      }
                      handleClickDeleteCategory={() =>
                        this.handleClickDeleteCategory(r)
                      }
                    />
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

        {upsertCategoryModalOpened && (
          <CategoryForm
            form={editCategoryForm}
            closeModal={() =>
              this.setState({ upsertCategoryModalOpened: false })
            }
          />
        )}

        {deleteCategoryModalOpened && (
          <CategoryDeleteConfirmModal
            categoryId={deleteCategoryId}
            closeModal={() =>
              this.setState({ deleteCategoryModalOpened: false })
            }
          />
        )}
      </div>
    );
  }
}

export default CategoryContainer;
