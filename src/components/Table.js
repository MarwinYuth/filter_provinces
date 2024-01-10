import { useState } from "react"
import { Modal } from "./Modal"
import { data } from "autoprefixer"

export const Table = ({data,onDelete}) => {

    const [popUp,setPopUp] = useState(false)
    const [viewEdit,setViewEdit] = useState()

    const onEdit = (provinceData) => {
        setPopUp(true)
        setViewEdit(provinceData)
    }

    return(
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-14">

            <h1 className="text-[30px] font-bold">Provinces Data</h1>

            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Provinces
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Districts
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Communes
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Villages
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>

                </thead>
                <tbody>

                    {
                        data.map((data) => {

                            return(

                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {data?.province?.name} / {data?.province?.name_km}
                                    </th>
                                    <td class="px-6 py-4">
                                        {data?.totalDistricts}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data?.totalCommunes}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data?.totalVillages}
                                    </td>
                                    <td class="px-6 py-4">
                                        <a className="text-blue-500 font-bold cursor-pointer" onClick={() => onEdit(data.province)}>Edit</a> / <a onClick={() => onDelete(data)} className="text-red-600 font-bold cursor-pointer">Delete</a>
                                    </td>
                                </tr>
                            )

                        })
                    }
                    
                </tbody>
            </table>

            <Modal data={viewEdit} onChangePopUp={setPopUp} isVisible={popUp}/>
            
        </div>
    )

}