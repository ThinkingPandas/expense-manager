import React, { Component } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import ReactTooltip from 'react-tooltip';
import './App.scss';
import Modal from './component/Modal/modal.component';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReport: false,
      showCategory: false,
      modal: {
        addCategory: false,
        createExpense: false,
        editCategory: false,
        editExpense: false,
        deleteCategory: false,
        deleteExpense: false,
      },
      mockCategoriesData: [
        {
          title: 'Food',
          description:
            'Bacon ipsum dolor amet duis prosciutto commodo ex culpa, capicola drumstick pariatur velit pork belly laborum pancetta tempor jowl frankfurter. Bacon t-bone laborum, cupidatat beef ribs quis flank pig proident id.',
        },
        {
          title: 'Social',
          description:
            'Bacon ipsum dolor amet duis prosciutto commodo ex culpa, capicola drumstick pariatur velit pork belly laborum pancetta tempor jowl frankfurter. Bacon t-bone laborum, cupidatat beef ribs quis flank pig proident id.',
        },
        {
          title: 'Personal',
          description:
            'Bacon ipsum dolor amet duis prosciutto commodo ex culpa.',
        },
      ],
      mockExpenseData: [
        {
          title: 'Jollibee 2 piece chicken',
          category: 'Food',
          date: '2018-02-06',
          expense: 125,
        },
        {
          title: 'Mcdo 2 piece chicken',
          category: 'Food',
          date: '2018-03-27',
          expense: 200,
        },
        {
          title: 'Avengers: Infinity Wars Movie Tickets',
          category: 'Social',
          date: '2018-02-19',
          expense: 300,
        },
        {
          title: 'Apartment Rent',
          category: 'Personal',
          date: '2018-04-30',
          expense: 6000,
        },
      ],
    };
  }

  _handleBack = () => {
    this.setState({
      showReport: false,
      viewCategory: false,
    });
  };

  _handleControlModal = (modalName, control) => {
    if (control === 'open') {
      let { modal } = this.state;
      modal[modalName] = true;
      this.setState({
        modal,
      });
    } else if (control === 'close') {
      let { modal } = this.state;
      modal[modalName] = false;
      this.setState({
        modal,
      });
    } else console.error('handle control modal has invalid params');
  };

  _handleNavigate = name => {
    let { viewCategory, showReport } = this.state;
    if (name === 'viewCategory') {
      viewCategory = true;
      this.setState({
        viewCategory,
      });
    } else if (name === 'showReport') {
      showReport = true;
      this.setState({
        showReport,
      });
    } else console.error('handle open has invalid params');
  };

  render() {
    let {
      showReport,
      viewCategory,
      mockExpenseData,
      mockCategoriesData,
      modal,
    } = this.state;

    return (
      <div className="ExpenseManager">
        <div className="em-navbar row mx-0">
          <div className="back-btn col-2">
            {showReport || viewCategory ? (
              <div onClick={this._handleBack} class="btn">
                <span>◀</span>
              </div>
            ) : null}
          </div>
          <div className="col-8 title-bar">
            <span>EXPENSE MANAGER</span>
          </div>
          <div className="col-2" />
        </div>

        <div className="em-body">
          {!showReport &&
            !viewCategory && (
              <div className="em-dash-table row m-3">
                <div
                  onClick={() =>
                    this._handleControlModal('createExpense', 'open')
                  }
                  className="em-fab-expense"
                  data-tip="Create Expense"
                >
                  <span>+</span>
                  <ReactTooltip />
                </div>

                <div className="em-dash-header">
                  <div className="total-expense mt-2">
                    <h2>₱{numeral(100000).format('0,0.00')}</h2>
                    <small>TOTAL EXPENSE</small>
                  </div>
                  <div className="action-buttons row mx-0 my-2">
                    <div className="col-sm-4 px-0 col-6 d-flex justify-content-center">
                      <div
                        className="btn"
                        onClick={() => this._handleNavigate('showReport')}
                      >
                        <small>SHOW REPORT</small>
                      </div>
                    </div>
                    <div className="col-sm-4 px-0 col-6 d-flex justify-content-center">
                      <div
                        className="btn"
                        onClick={() => this._handleNavigate('viewCategory')}
                      >
                        <small>CATEGORIES</small>
                      </div>
                    </div>
                    <div className="col-sm-4 col-12 d-flex justify-content-center em-expense">
                      <div
                        className="btn"
                        onClick={() =>
                          this._handleControlModal('createExpense', 'open')
                        }
                      >
                        <small>CREATE EXPENSE</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 px-0 mt-2">
                  <h5>EXPENSE LIST</h5>
                  {mockExpenseData ? (
                    <div>
                      {mockExpenseData.map((r, i) => (
                        <div className="expense-entry row mx-0 mb-2">
                          <div className="col-md-9 col-8 px-1">
                            <div>
                              <small className="font-weight-bold">
                                {r.title}
                              </small>
                            </div>
                            <div>
                              <small className="expense-category">
                                {r.category}
                              </small>
                              <small> {moment(r.date).format('ll')}</small>
                            </div>
                          </div>
                          <div className="col-md-3 col-4 d-flex justify-content-between flex-column px-1">
                            <h6 className="m-0 text-right word-break-all">
                              ₱ {numeral(r.expense).format('0,0.00')}
                            </h6>
                            <div className="row mx-0 justify-content-end">
                              <div
                                className="circle-btn"
                                onClick={() =>
                                  this._handleControlModal(
                                    'editExpense',
                                    'open'
                                  )
                                }
                              >
                                <span className="material-icons">edit</span>
                              </div>
                              <div className="circle-btn"
                                onClick={() =>
                                  this._handleControlModal(
                                    'deleteExpense',
                                    'open'
                                  )
                                }>
                                <span className="material-icons">delete</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="d-flex my-5 p-5 justify-content-center align-items-center">
                      <h6 className="text-muted">NO EXPENSE DATA</h6>
                    </div>
                  )}
                </div>
              </div>
            )}

          {showReport && (
            <div className="em-report row mx-0 my-3">
              <div className="col-12">
                <h4>REPORT</h4>
              </div>
            </div>
          )}

          {viewCategory && (
            <div className="em-category row mx-0 my-3">
              <div className="col-12">
                <h4>CATEGORIES</h4>
                {mockCategoriesData ? (
                  <div>
                    {mockCategoriesData.map((r, i) => (
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
                            <div className="circle-btn"
                                onClick={() =>
                                  this._handleControlModal(
                                    'deleteCategory',
                                    'open'
                                  )
                                }>
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
          )}

          {modal.createExpense && (
            <Modal
              onClose={() => this._handleControlModal('createExpense', 'close')}
              onSave={() => this._handleControlModal('createExpense', 'close')}
              title="Create Expense"
            >
              <div className="form-group">
                <input
                  placeholder="Title"
                  type="text"
                  class="form-control form-control-sm"
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-sm"
                  onChange={() =>
                    this._handleControlModal('addCategory', 'open')
                  }
                >
                  <option disabled selected>
                    Category
                  </option>
                  <option>+ Add Category</option>
                </select>
              </div>

              <div className="form-group">
                <input
                  required
                  type="date"
                  class="form-control form-control-sm"
                />
              </div>

              <div className="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupPrepend3">
                      ₱
                    </span>
                  </div>
                  <input
                    type="number"
                    className=" form-control"
                    placeholder="0.00"
                    aria-describedby="inputGroupPrepend3"
                  />
                </div>
              </div>
            </Modal>
          )}

          {modal.addCategory && (
            <Modal
              onClose={() => this._handleControlModal('addCategory', 'close')}
              onSave={() => this._handleControlModal('addCategory', 'close')}
              title="Add Category"
            >
              <div className="form-group">
                <input
                  placeholder="Title"
                  type="text"
                  class="form-control form-control-sm"
                />
              </div>

              <div class="form-group">
                <textarea
                  class="form-control"
                  placeholder="description"
                  rows="3"
                />
              </div>
            </Modal>
          )}

          {modal.editCategory && (
            <Modal
              onClose={() => this._handleControlModal('editCategory', 'close')}
              onSave={() => this._handleControlModal('editCategory', 'close')}
              onSaveText="CONFIRM"
              title="Edit Category"
            >
              <div className="form-group">
                <input
                  placeholder="Title"
                  type="text"
                  class="form-control form-control-sm"
                />
              </div>

              <div class="form-group">
                <textarea
                  class="form-control"
                  placeholder="description"
                  rows="3"
                />
              </div>
            </Modal>
          )}

          {modal.editExpense && (
            <Modal
              onClose={() => this._handleControlModal('editExpense', 'close')}
              onSave={() => this._handleControlModal('editExpense', 'close')}
              onSaveText="CONFIRM"
              title="Edit Expense"
            >
              <div className="form-group">
                <input
                  placeholder="Title"
                  type="text"
                  class="form-control form-control-sm"
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-sm"
                  onChange={() =>
                    this._handleControlModal('addCategory', 'open')
                  }
                >
                  <option disabled selected>
                    Category
                  </option>
                  <option>+ Add Category</option>
                </select>
              </div>

              <div className="form-group">
                <input
                  required
                  type="date"
                  class="form-control form-control-sm"
                />
              </div>

              <div className="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupPrepend3">
                      ₱
                    </span>
                  </div>
                  <input
                    type="number"
                    className=" form-control"
                    placeholder="0.00"
                    aria-describedby="inputGroupPrepend3"
                  />
                </div>
              </div>
            </Modal>
          )}

          {modal.deleteExpense && (
            <Modal
              onClose={() => this._handleControlModal('deleteExpense', 'close')}
              onSave={() => this._handleControlModal('deleteExpense', 'close')}
              onSaveText="CONFIRM"
              title="Delete Expense"
            >
              Are you sure you want to delete this expense?
            </Modal>
          )}

          {modal.deleteCategory && (
            <Modal
              onClose={() => this._handleControlModal('deleteCategory', 'close')}
              onSave={() => this._handleControlModal('deleteCategory', 'close')}
              onSaveText="CONFIRM"
              title="Delete Category"
            >
              Are you sure you want to delete this category?
            </Modal>
          )}

        </div>
      </div>
    );
  }
}

export default App;
