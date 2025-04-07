import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Layout, Input, Typography, Table, TablePaginationConfig, Button, Popconfirm } from "antd";
import { NavLink } from "react-router";
import { NotificationType, notifyUserRegistration } from "../../utilities/helpers";
import bannerSvc from "../../services/banner.service";
import { IResponseType } from "../../services/http.service";

interface IbannerData {
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

const BannerList = () => {
  const [data, setData] = useState<Array<IbannerData>>([]);
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

  const getAllbanners = async ({ page = pagination.current, limit = pagination.pageSize, search=''}: IPaginationProps) => {
    try {
        setLoading(true)
      const response: IResponseType = await bannerSvc.getRequest("/banner", {
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
      notifyUserRegistration("banners cannot be displayed at this time. Please try again later.", NotificationType.ERROR);
      throw exception;
    } finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    // Initial API call
    getAllbanners({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {  // debounce: user ley input xodeko time : background resource
      getAllbanners({
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

    getAllbanners({
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
      render:(value:string) => <NavLink to={'/banner-detail/'+value} target="_banner">{'/banner-detail/'+value}</NavLink>
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (value: { url: string; optimizedUrl: string }) => <img src={value.optimizedUrl} alt="" className="w-25" />,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value: string) => <Button variant="filled" color={value === "active" ? "green" : "red"}>{value === "active" ? "published" : "un-published"}</Button>,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (value: string) => {
        // console.log('Bananer _id :',value)
        return (
          <>
            <div className="flex gap-5">
              <NavLink to={"/admin/banner/"+ value} className="text-green-600!">
                <EditOutlined />
              </NavLink>
              <Popconfirm title="Are you sure?" 
              description="Once deleted the banner, cannot be reverted back" 
              okText="Yes" cancelText="Cancel" 
              okButtonProps={{ className: "bg-red-800!" }} cancelButtonProps={{ className: "bg-green-700! text-white!" }}
              onConfirm={async () => {
                try {
                  await bannerSvc.delRequest('/banner/' + value);
                  notifyUserRegistration('banner deleted successfully', NotificationType.SUCCESS);
            
                  // Refresh current page after delete
                  getAllbanners({
                    page: pagination.current,
                    limit: pagination.pageSize,
                  });
                } catch (exception) {
                  console.error('Delete error', exception);
                  notifyUserRegistration("banner cannot be deleted at this time. Please try again", NotificationType.ERROR);
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
            title:"banner One",
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
            title:"banner Two",
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
            title:"banner Three",
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
        <Typography.Title className="text-center text-white! bg-yellow-500 text-3xl p-2 rounded-md">banners</Typography.Title>
      </div>
      <div className="flex justify-between mt-3">
        <Input.Search enterButton placeholder="Search banners" onChange={(e) => {
            setSearch(e.target.value)
        }} className="w-100!" />
        <NavLink to="/admin/banner/create" className="bg-green-600! text-white! rounded-md p-1.5 hover:bg-green-800!">
          <PlusOutlined /> Add banner
        </NavLink>
      </div>
      <div className="mt-3">
        <Table
          size="small"
          columns={columns}
          dataSource={data}
          rowKey={(record) => record._id}
          pagination={pagination}
          loading={{ spinning: loading, tip: 'banners loading...', size: 'small' }}
          onChange={handleTableChange}
        />
      </div>
    </Layout.Content>
  );
};

export default BannerList;
