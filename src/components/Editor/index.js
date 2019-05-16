import React from "react";
import { Form, Input, Button } from "antd";
const TextArea = Input.TextArea
const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
  <div>
    <Form.Item>
      <TextArea placeholder='3个字起评，不讲价哦!' rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item >
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        disabled={!value||value.length<3}
        type="primary"
      >
      发表
      </Button>
    </Form.Item>
  </div>
);
export default Editor