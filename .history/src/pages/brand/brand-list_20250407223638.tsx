import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Layout, Input, Typography, Table, TablePaginationConfig, Button, Popconfirm } from "antd";
import { NavLink } from "react-router";
import { NotificationType, notifyUserRegistration } from "../../utilities/helpers";
import brandSvc from "../../services/brand.service";
import { IResponseType } from "../../services/http.service";

interface IbrandData {
  _id: string;
  title: string;
  status: string;
  url: string;
  image: {
    url: string;
    optimizedUrl: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const BrandList = () => {
  const [data, setData] = useState<Array<IbrandData>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    total: 0,
    pageSize: 6,
    current: 1,
  });
  const [search,setSearch] = useState<string>('')

  type IPaginationProps = {
    page?: number;
    limit?: number;
    search?:string | null
  };

  const getAllbrands = async ({ page = pagination.current, limit = pagination.pageSize, search=''}: IPaginationProps) => {
    try {
        setLoading(true)
      const response: IResponseType = await brandSvc.getRequest("/brand", {
        params: {
          limit: limit,
          page: page,
          search:search
        },
      });
      setData(response.result.data);
      setPagination({
        total: response.result.options.total,
        pageSize: response.result.options.limit,
        current: response.result.options.page,
      });
    } catch (exception) {
      notifyUserRegistration("brands cannot be displayed at this time. Please try again later.", NotificationType.ERROR);
      throw exception;
    } finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    // Initial API call
    getAllbrands({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {  // debounce: user ley input xodeko time : background resource
      getAllbrands({
        page: pagination.current,
        limit: pagination.pageSize,
        search: search,
      });
    }, 500); //350 mili sec paxi api call hunxa

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination({
      ...pagination,
    });

    getAllbrands({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Url",
      dataIndex: "slug",
      render:(value:string) => <NavLink to={'/brand-detail/'+value} target="_brand">{'/brand-detail/'+value}</NavLink>
    },
    {
      title: "Logo",
      dataIndex: "image",
      render: (value: { url: string; optimizedUrl: string }) => <img src={value.optimizedUrl} alt="" className="H-1" />,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value: string) => <Button variant="filled" color={value === "active" ? "green" : "red"}>{value === "active" ? "published" : "un-published"}</Button>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (value: string) => {
        // console.log('Bananer _id :',value)
        return (
          <>
            <div className="flex gap-5">
              <NavLink to={"/admin/brand/"+ value} className="text-green-600!">
                <EditOutlined />
              </NavLink>
              <Popconfirm title="Are you sure?" 
              description="Once deleted the brand, cannot be reverted back" 
              okText="Yes" cancelText="Cancel" 
              okButtonProps={{ className: "bg-red-800!" }} cancelButtonProps={{ className: "bg-green-700! text-white!" }}
              onConfirm={async () => {
                try {
                  await brandSvc.delRequest('/brand/' + value);
                  notifyUserRegistration('brand deleted successfully', NotificationType.SUCCESS);
            
                  // Refresh current page after delete
                  getAllbrands({
                    page: pagination.current,
                    limit: pagination.pageSize,
                  });
                } catch (exception) {
                  console.error('Delete error', exception);
                  notifyUserRegistration("brand cannot be deleted at this time. Please try again", NotificationType.ERROR);
                }
              }}
              >
                <span className="text-red-600!">
                  <DeleteOutlined />
                </span>
              </Popconfirm>
            </div>
          </>
        );
      },
    },
  ];

   
    /* ([
        {
            _id:"asads-sdcas-aw",
            title:"brand One",
            url:"www.google.com",
            status:"inactive",
            image:{
                publicUrl:"",
                optimizedUrl:""
            },
            createdAt:"",
            updatedAt:""
        },
        {
            _id:"asads-sasdacas-aw",
            title:"brand Two",
            url:"www.google.com",
            status:"active",
            image:{
                publicUrl:"",
                optimizedUrl:""
            },
            createdAt:"",
            updatedAt:""
        },
        {
            _id:"asads-sdcsssss-aw",
            title:"brand Three",
            url:"www.google.com",
            status:"active",
            image:{
                publicUrl:"",
                optimizedUrl:""
            },
            createdAt:"",
            updatedAt:""
        }
    ]) */

  return (
    <Layout.Content className="rounded-md p-5">
      <div className="border-b border-b-gray-500">
        <Typography.Title className="text-center text-white! bg-yellow-500 text-3xl p-2 rounded-md">brands</Typography.Title>
      </div>
      <div className="flex justify-between mt-3">
        <Input.Search enterButton placeholder="Search brands" onChange={(e) => {
            setSearch(e.target.value)
        }} className="w-100!" />
        <NavLink to="/admin/brand/create" className="bg-green-600! text-white! rounded-md p-1.5 hover:bg-green-800!">
          <PlusOutlined /> Add brand
        </NavLink>
      </div>
      <div className="mt-3">
        <Table
          size="small"
          columns={columns}
          dataSource={data}
          rowKey={(record) => record._id}
          pagination={pagination}
          loading={{ spinning: loading, tip: 'brands loading...', size: 'small' }}
          onChange={handleTableChange}
        />
      </div>
    </Layout.Content>
  );
};

export default BrandList;
