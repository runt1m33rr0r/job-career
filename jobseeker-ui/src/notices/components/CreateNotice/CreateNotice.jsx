import React, { useState } from "react";
import PropTypes from "prop-types";
import BaseNoticeModal from "../BaseNoticeModal";
import Button from "../NoticeModalButton";

function CreateNotice(props) {
  const [category, setCategory] = useState(props.categories[0].name);
  const [title, setTitle] = useState("");
  const [content, setDescription] = useState("");

  const handleCategoryChange = category => setCategory(category);
  const handleTitleChange = title => setTitle(title);
  const handleDescriptionChange = content => setDescription(content);
  const handlePublishNotice = () =>
    props.createNoticeRequest({ category, title, content });

  return (
    <BaseNoticeModal
      readOnly={false}
      onCategoryChange={handleCategoryChange}
      onTitleChange={handleTitleChange}
      onDescriptionChange={handleDescriptionChange}
      notice={{ title, category, content, company: props.companyName }}
      {...props}
    >
      <Button text="Publish" onClick={handlePublishNotice} />
    </BaseNoticeModal>
  );
}

CreateNotice.propTypes = {
  createNoticeRequest: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ),
  companyName: PropTypes.string.isRequired
};

export default CreateNotice;
