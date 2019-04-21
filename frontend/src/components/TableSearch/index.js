import React from 'react';
import { Input } from 'antd';
import './style.scss';
import { getDoctorMedcardData } from 'api';
import * as doctorActions from 'actions/doctorActions';
import * as patientActions from 'actions/patientActions';
import { connect } from 'react-redux';

let timer = null;

const mapStateToProps = ({ authState }) => {
  return {
    userId: authState.userId,
    token: authState.token,
  }
};

class TableSearch extends React.Component {

  searchUser = (value) => {
    const {
      type,
      userId,
      dispatch,
      token
    } = this.props;
    clearTimeout(timer);
    timer = setTimeout(
      () => {
        if (type === 'doctor') {
          dispatch(doctorActions.toggleTableLoading());
          getDoctorMedcardData(userId, {
              p: 1,
              filter: value
            },
            { authorization: token }
          )
            .then(resp => {
              dispatch(doctorActions.toggleTableLoading());
              dispatch(doctorActions.setMedcardData(resp.entries, Number(resp.total)));
              dispatch(doctorActions.setPage(1));
            })
        } else {
          dispatch(patientActions.toggleTableLoading());
          getDoctorMedcardData(userId, {
              p: 1,
              filter: value
            },
            { authorization: token }
          )
            .then(resp => {
              dispatch(patientActions.toggleTableLoading());
              dispatch(patientActions.setMedcardData(resp.entries, Number(resp.total)));
              dispatch(patientActions.setPage(1));
            })
        }
      },
      500,
    )
  };

  render() {
    const { placeholder } = this.props;
    return (
      <div className="select-search">
        <Input
          placeholder={placeholder}
          allowClear
          onChange={(e) => this.searchUser(e.target.value)}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(TableSearch);
