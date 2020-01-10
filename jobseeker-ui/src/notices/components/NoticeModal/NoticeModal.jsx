import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import BaseNoticeModal from "../BaseNoticeModal";
import Button from "../NoticeModalButton";
import ApplicationModal from "../../../applications/components/ApplicationModal";
import { userTypes, noticeStatuses } from "../../../shared/constants";

function NoticeModal(props) {
  const isApprovalNotice = props.userType === userTypes.ADMIN;
  const isCreationNotice =
    props.userType === userTypes.COMPANY && props.creationNotice;
  const isViewNotice =
    props.viewNotice ||
    (props.userType === userTypes.COMPANY &&
      props.company.name !== props.companyName &&
      !isCreationNotice);
  const isEditNotice =
    props.userType === userTypes.COMPANY &&
    props.company.name === props.companyName &&
    !isViewNotice;
  const isApplicationNotice =
    !isViewNotice && props.userType === userTypes.USER;

  const getDefaultCategory = () => {
    if (!isEditNotice && props.categories.length > 0) {
      return props.categories[0].name;
    } else {
      return props.category.name;
    }
  };

  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [title, setTitle] = useState(isCreationNotice ? "" : props.title);
  const [category, setCategory] = useState(getDefaultCategory());
  const [description, setDescription] = useState(
    isCreationNotice ? "" : props.description
  );

  const shouldDisable = () =>
    props.isFetching || !category || !title || !description;

  useEffect(() => {
    if (!isCreationNotice) {
      setCategory(props.category.name);
      setDescription(props.description);
      setTitle(props.title);
    }
  }, [props, isCreationNotice]);

  const { category: propsCategory, categories } = props;
  useEffect(() => {
    if (isCreationNotice) {
      setCategory(
        categories.length > 0 ? categories[0].name : propsCategory.name
      );
    }
  }, [categories, propsCategory, isCreationNotice]);

  const makeApprovalRequest = approved => {
    if (approved) {
      props.editNoticeRequest({
        id: props.id,
        status: noticeStatuses.OPEN
      });
    } else {
      props.editNoticeRequest({
        id: props.id,
        status: noticeStatuses.DENIED
      });
    }
  };

  const makeNoticeStatusRequest = closed => {
    if (closed) {
      props.editNoticeRequest({
        id: props.id,
        status: noticeStatuses.CLOSED
      });
    } else {
      props.editNoticeRequest({
        id: props.id,
        status: noticeStatuses.PENDING
      });
    }
  };

  const handlePublishNotice = () => {
    props.createNoticeRequest({ category, title, description });
    props.onClose();
  };

  const handleUpdateNotice = () =>
    props.editNoticeRequest({
      id: props.id,
      status: noticeStatuses.PENDING,
      category,
      title,
      description
    });

  const handleNoticeDelete = () => {
    props.deleteNoticeRequest({ id: props.id });
    props.onClose();
  };

  const handleNoticeOpen = () => makeNoticeStatusRequest(false);
  const handleNoticeClose = () => makeNoticeStatusRequest(true);
  const handleApplicationWindowOpen = () => setIsApplicationOpen(true);
  const handleApplicationWindowClose = () => setIsApplicationOpen(false);
  const onApproved = () => makeApprovalRequest(true);
  const onDisapproved = () => makeApprovalRequest(false);
  const handleCategoryChange = category => setCategory(category);
  const handleTitleChange = title => setTitle(title);
  const handleDescriptionChange = content => setDescription(content);

  if (!category) {
    return null;
  }

  return (
    <BaseNoticeModal
      {...props}
      readOnly={isApplicationNotice || isApprovalNotice || isViewNotice}
      onCategoryChange={handleCategoryChange}
      onTitleChange={handleTitleChange}
      onDescriptionChange={handleDescriptionChange}
      title={title}
      category={category}
      content={description}
      company={
        isCreationNotice && props.companyName
          ? props.companyName
          : props.company.name
      }
    >
      {isApplicationNotice && (
        <Fragment>
          <ApplicationModal
            createApplication={true}
            isOpen={isApplicationOpen}
            onClose={handleApplicationWindowClose}
            jobNotice={{
              id: props.id,
              company: props.company,
              description: props.description
            }}
          />
          <Button text="Apply" onClick={handleApplicationWindowOpen} />
        </Fragment>
      )}
      {isApprovalNotice && !props.closed && (
        <Fragment>
          <Button
            text="Approve"
            onClick={onApproved}
            disabled={props.isFetching || props.status === noticeStatuses.OPEN}
          />
          <Button
            text="Disapprove"
            onClick={onDisapproved}
            disabled={
              props.isFetching || props.status === noticeStatuses.DENIED
            }
          />
        </Fragment>
      )}
      {isCreationNotice && (
        <Button
          text="Publish"
          onClick={handlePublishNotice}
          disabled={shouldDisable()}
        />
      )}
      {isEditNotice && (
        <Fragment>
          <Button
            text="Update"
            onClick={handleUpdateNotice}
            disabled={shouldDisable()}
          />
          <Button
            text="Delete"
            onClick={handleNoticeDelete}
            disabled={props.isFetching}
          />
          <Button
            text="Open"
            onClick={handleNoticeOpen}
            disabled={
              props.isFetching ||
              props.status === noticeStatuses.PENDING ||
              props.status === noticeStatuses.OPEN
            }
          />
          <Button
            text="Close"
            onClick={handleNoticeClose}
            disabled={
              props.isFetching || props.status === noticeStatuses.CLOSED
            }
          />
        </Fragment>
      )}
    </BaseNoticeModal>
  );
}

NoticeModal.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  userType: PropTypes.string.isRequired,
  editNoticeRequest: PropTypes.func.isRequired,
  createNoticeRequest: PropTypes.func.isRequired,
  deleteNoticeRequest: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  companyName: PropTypes.string,
  creationNotice: PropTypes.bool,
  viewNotice: PropTypes.bool,
  category: PropTypes.object,
  title: PropTypes.string,
  status: PropTypes.string,
  description: PropTypes.string,
  company: PropTypes.object,
  id: PropTypes.any
};

NoticeModal.defaultProps = {
  categories: [],
  company: {},
  category: {}
};

export default NoticeModal;
