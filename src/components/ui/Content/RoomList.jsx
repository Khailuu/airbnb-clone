import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPhongTheoMaViTri } from '../../../hooks/useGetPhongTheoViTri';

export const RoomList = () => {
  const { id: maViTri } = useParams();
  // const [ viTri, setViTri ] = useState(maViTri)

  const { data: roomList, isLoading, isError, refetch } = useGetPhongTheoMaViTri(maViTri);

  
  useEffect(() => {
    refetch(maViTri);
  }, [maViTri]);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div> 
      RoomList
      {
        roomList?.map((viTri) => {
          return (
            <p key={viTri.id}>{viTri.tenPhong}</p>
          )
        })
      }
    </div>
  );
};
