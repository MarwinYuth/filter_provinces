"use client"
import { ProvinceForm } from '@/components/ProvineceForm'
import { useEffect, useMemo, useState } from 'react'
import { uuidv4 } from '@/utils'
import { DistrictForm } from '@/components/DistrictForm'
import { CommunesForm } from '@/components/CommunesForm'
import { VillageForm } from '@/components/VillageForm'
import { Table } from '@/components/Table'
import { data } from 'autoprefixer'
import { DistrictTable, ReuseableTable } from '@/components/ReuseableTable'
import { Modal } from '@/components/Modal'

export default function Home() {
  const [selectProvinceId,setSelectProvinceId] = useState(null)

  const [popUp,setPopUp] = useState(false)
  const [viewDetail,setViewDetail] = useState()

  const [provinces,setProvinces] = useState([])
  const [districts,setDistricts] = useState([])
  const [communes,setCommunes] = useState([])
  const [villages,setVillages] = useState([])
  // const [data,setData] = useState([])

  // useEffect(() => {

  //   if(provinces.length === 0){
  //     return
  //   }

  //   setData(prev => {
  //     const id = uuidv4()

  //     return[
  //       ...prev,
  //       {
  //         id:id,
  //         provinces:provinces.find(province => province.id === selectProvinceId),
  //         totalDistricts:0,
  //         totalCommunes:0,
  //         totalVillages:0
  //       }
  //     ]
  //   })

  // },[provinces])

  const data = useMemo(() => {

    const id = uuidv4();
    return provinces.map((province) => {

      const districtResults = districts.filter(
        (district) => district.province_id === province.id
      );

      const communeResults = communes.filter((commune) =>
        districtResults.filter(
          (district) => district.id === commune.district_id
        )
      );

      const totalVillage = villages.filter((vil) =>
        communeResults.find((com) => com.id === vil.commune_id)
      );

      const result = {
        id: id,
        province,
        totalDistricts: districtResults.length,
        totalCommunes: communeResults.length,
        totalVillages: totalVillage.length,
      };

      return result;
    });

  }, [provinces, districts, communes, villages]);

  console.log(provinces);

  const onSaveProvince = (param) => {

    const id = uuidv4()
    setProvinces(prev => {

      prev.push({
        id:id,
        ...param
      })
      return prev
    })

    setProvinces([...provinces])
  }

  const onSaveDistrict = (param) => {

    const id = uuidv4() 

    setDistricts((pre) => {
      return [
        ...pre,
        {
          id: id,
          ...param,
        },
      ];
    });

    setDistricts(prev => [...prev])
    console.log(districts);
  }

  const onSaveCommune = (param) => {
    const id = uuidv4()


    setCommunes(prev => {

      prev.push({
        id:id,
        ...param
      })

      return prev

    })
    console.log(communes)
    setCommunes([...communes])
  }

  const onSaveVillage = (param) => {
    const id = uuidv4();

    setVillages(prev => {
      prev.push({
        id:id,
        ...param
      })

      return prev
    })

    setVillages([...villages])
  }


  const onDelete = (param) => {
    // console.log(param);

    const provinceId = param.province.id

    setProvinces(prev => prev.filter(pro => pro.id !== provinceId))

    // const provinceData = provinces.find(pro => pro.id === param)
    // setProvinces(provinces.filter(pro => pro.id !== provinceData.id));
  
    setDistricts(districts.filter(dis => dis.province_id !== provinceId));

    const districtData = districts.find(dis => dis.province_id === provinceId)
    setCommunes(communes.filter(com => com.district_id !== districtData.id))
    
    const communeData = communes.find(com => com.district_id === districtData.id)
    setVillages(villages.filter(vill => vill.commune_id !== communeData.id))
  }

  const onViewEdit = (data) => {
    setPopUp(true)
    setViewDetail(data)
    console.log(data);
  }

  const onUpdate = (param) => {

    console.log(param);
    
  }


  const testButton = () => {

    console.log(provinces);

    console.log(districts);

    console.log(communes);

  }

  return (
    
    <div className='w-[1200px] m-auto'>

      <ProvinceForm onSave={onSaveProvince} />
      <DistrictForm provinces={provinces} onSave={onSaveDistrict}/>
      <CommunesForm provinces={provinces} districts={districts} onSave={onSaveCommune}/>
      <VillageForm communes={communes} provinces={provinces} districts={districts} onSave={onSaveVillage}/>

      <Table data={data} onDelete={onDelete}  onEdit={onViewEdit}/>

      <ReuseableTable label='District Data' data={districts} onEdit={onViewEdit} onDelete={setDistricts}/>

      <ReuseableTable label='Communes Data' data={communes} onDelete={setCommunes}/>

      <ReuseableTable label='Villages Data' data={villages} onDelete={setVillages}/>

      <div className='h-[50px]'></div>
      <button onClick={testButton} className='mt-8 bg-pink-500 p-4'>Test Button</button>


      <Modal data={viewDetail} onChangePopUp={setPopUp} isVisible={popUp} onUpdate={onUpdate}/>
    
    </div>

  )
}
