import React from "react";
import {Button, Divider, Modal} from "antd";


export interface IDetailInfoModal {
  key: string;
  value: string;
  colspan?: string;
}

export interface IDetailModal {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  details: IDetailInfoModal[];
  column?: string;
  width?: number;
}

export default function DetailModal({
  title,
  isOpen,
  setIsOpen,
  details,
  column = "grid-cols-2",
  width,
}: IDetailModal) {
  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      destroyOnClose
      footer={[
        <Button key="back" onClick={() => setIsOpen(false)}>
          Tutup
        </Button>,
      ]}
      centered
      width={width}
    >
      <Divider className={"mb-8"} />
      <section className={`grid ${column} gap-x-6 gap-y-4`}>
        {details.map((item, index) => {
          return (
            <div key={index} className={`${item.colspan ?? "col-span-1"}`}>
              <h6 className={"font-medium capitalize"}>{item.key}</h6>
              <p className={"font-light"}>{item.value}</p>
            </div>
          );
        })}
      </section>
      <Divider className={"mt-8"} />
    </Modal>
  );
}
