import React from "react";
import { Button, Form, Modal, Select, Table } from "antd";

function EmployeeManagement() {
  const employeeList = [
    {
      id: 1,
      name: "Nguyen Van A",
      username: "anv",
      phone: "023383838",
      email: "anv@vnpt-technology.vn",
    },
    {
      id: 2,
      name: "Nguyen Van B",
      username: "bnv",
      phone: "0233847712",
      email: "bnv@vnpt-technology.vn",
    },
    {
      id: 3,
      name: "Nguyen Van C",
      username: "csv",
      phone: "033383838",
      email: "csv@vnpt-technology.vn",
    },
    {
      id: 4,
      name: "Nguyen Van D",
      username: "denv",
      phone: "025553838",
      email: "denv@vnpt-technology.vn",
    },
  ];

  const addApp = () =>
    Modal.confirm({
      title: "Thêm ứng dụng",
      content: (
        <div>
          <Form.Item>
            <Select
              placeholder="Chọn ứng dụng"
              options={[{ value: 1, label: "Bonita vacation request" }]}
            />
          </Form.Item>
        </div>
      ),
      okText: "Thêm",
      cancelText: "Huỷ",
    });
  const addRole = () =>
    Modal.confirm({
      title: "Thêm quyền",
      content: (
        <div>
          <Form.Item>
            <Select
              placeholder="Chọn quyền"
              mode="multiple"
              options={[
                { value: 1, label: "admin" },
                { value: 2, label: "user" },
              ]}
            />
          </Form.Item>
        </div>
      ),
      okText: "Thêm",
      cancelText: "Huỷ",
    });

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Hành động",
      key: "action",
      render: () => (
        <div className="flex gap-x-2">
          <Button onClick={addApp} type="primary">
            Thêm ứng dụng
          </Button>
          <Button onClick={addRole}>Thêm quyền</Button>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full h-full p-4">
      <Table dataSource={employeeList} columns={columns} />
    </div>
  );
}

export default EmployeeManagement;
