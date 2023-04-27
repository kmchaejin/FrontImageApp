import React from 'react';
import RemoveAllPhoto from '../components/RemoveAllPhoto';
import RestoreAllPhoto from '../components/RestoreAllPhoto';
import { useQuery } from '@tanstack/react-query';
import { getTrashImage } from '../api/trash';
import { useAuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';


export default function Trash() {
  const { user } = useAuthContext();

  const { isLoading, isFetching, error, data : result } = useQuery(['trashImage'], () => getTrashImage(user.uid));
  
  const trashId = result?.map((image) => image?.id)
  const trashNameList = result?.map((image) => image?.image_url.substring(image?.image_url.lastIndexOf('/')+1).split('.')[0])
  //console.log(trashNameList)
  // var url  = require('url');
  // var urlObject  = url.parse('https://res.cloudinary.com/du2iwfybr/image/upload/v1681375757/xflqoikpefnfmrcckf6n.jpg');
  // console.log(urlObject);
  //const trashImgName = trashURL?.map((url) => )
  // console.log("trashList : " + trashList)

  if(isLoading || isFetching){
    return (
      <>
        <Loading/>
      </>
    )
  }

  if(error) {
    return (<div>에러가 발생했습니다 : {error}</div>)
  }

  return (
    <div className="bg-white">
    
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-0 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-black justify-start">휴지통</h2>
        <div className="space-x-2 flex justify-end">
          <RestoreAllPhoto trashId={trashId} />
          <RemoveAllPhoto trashId={trashId} trashNameList={trashNameList} />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-4 lg:grid-cols-8 xl:gap-x-2">
          {result && result?.map((trashImg) => (
            <div key={trashImg?.id} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-40">
                <img
                  src={trashImg?.image_url}
                  alt="image"
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-0 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={trashImg?.image_url}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {/* <p className="mt-1 text-sm text-gray-500"># {product.category}</p> */}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
