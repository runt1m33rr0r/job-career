import { connect } from "react-redux";
import ApplicationModal from "./ApplicationModal";
import {
  createApplicationRequest,
  editApplicationRequest,
  deleteApplicationRequest
} from "../../data/applicationsSlice";

const mapStateToProps = state => ({
  userType: state.auth.userType,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
  phoneNumber: state.auth.phoneNumber,
  userEmail: state.auth.email,
  candidateId: state.auth.userId
});

const mapDispatchToProps = {
  createApplicationRequest,
  editApplicationRequest,
  deleteApplicationRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationModal);
