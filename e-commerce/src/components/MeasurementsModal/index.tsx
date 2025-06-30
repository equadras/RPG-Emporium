import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";

interface IMeasurementsModalProps {
  productCategory: string
  setShowMeasurementsModal: (value: boolean) => void
}

const clothesMeasurementsData = [
  {
    key: "1",
    size: "PP",
    description: "Busto 78-82cm | Cintura 60-64cm | Quadril 88-92cm",
  },
  {
    key: "2",
    size: "P",
    description: "Busto 82-86cm | Cintura 64-68cm | Quadril 92-96cm",
  },
  {
    key: "3",
    size: "M",
    description: "Busto 86-90cm | Cintura 68-72cm | Quadril 96-100cm",
  },
  {
    key: "4",
    size: "G",
    description: "Busto 90-94cm | Cintura 72-76cm | Quadril 100-104cm",
  },
  {
    key: "5",
    size: "XG",
    description: "Busto 94-98cm | Cintura 76-80cm | Quadril 104-108cm",
  },
  {
    key: "6",
    size: "1G",
    description: "Busto 98-102cm | Cintura 80-84cm | Quadril 108-112cm",
  },
  {
    key: "7",
    size: "2G",
    description: "Busto 102-106cm | Cintura 84-88cm | Quadril 112-116cm",
  },
  {
    key: "8",
    size: "3G",
    description: "Busto 106-110cm | Cintura 88-92cm | Quadril 116-120cm",
  },
]

const shoesMeasurementsData = [
  {
    key: "1",
    size: "37",
    description: "Comprimento do pé ~ 24,4 cm",
  },
  {
    key: "2",
    size: "38",
    description: "Comprimento do pé ~ 25,0 cm",
  },
  {
    key: "3",
    size: "39",
    description: "Comprimento do pé ~ 25,6 cm",
  },
  {
    key: "4",
    size: "40",
    description: "Comprimento do pé ~ 26,3 cm",
  },
  {
    key: "5",
    size: "41",
    description: "Comprimento do pé ~ 26,9 cm",
  },
  {
    key: "6",
    size: "42",
    description: "Comprimento do pé ~ 27,6 cm",
  },
  {
    key: "7",
    size: "43",
    description: "Comprimento do pé ~ 28,3 cm",
  },
  {
    key: "8",
    size: "44",
    description: "Comprimento do pé ~ 28,9 cm",
  },
]

const MeasurementsModal: React.FC<IMeasurementsModalProps> = ({
  productCategory,
  setShowMeasurementsModal,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataSource, setDataSource] = useState<any[]>([]);
  const columns = [
    {
      title: "Tamanho",
      dataIndex: "size",
      key: "size",
      width: "20%",
    },
    {
      title: "Medidas",
      dataIndex: "description",
      key: "description",
    },
  ];

  useEffect(() => {
    if (["tshirts", "coats", "shorts"].includes(productCategory)) {
      setDataSource(clothesMeasurementsData);
    } else {
      setDataSource(shoesMeasurementsData);
    }
  }, [productCategory]);

  function handleCancel() {
    setShowMeasurementsModal(false);
  }

  return (
    <Modal
      title="Tabela de Medidas"
      open
      onCancel={handleCancel}
      footer={null}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </Modal>
  );
};

export default MeasurementsModal;
