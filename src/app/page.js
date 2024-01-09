"use client"
import { ProvinceForm } from '@/components/ProvineceForm'
import { useEffect, useState } from 'react'
import { uuidv4 } from '@/utils'
import { DistrictForm } from '@/components/DistrictForm'
import { CommunesForm } from '@/components/CommunesForm'
import { VillageForm } from '@/components/VillageForm'
import { Table } from '@/components/Table'
import { data } from 'autoprefixer'
import { DistrictTable, ReuseableTable } from '@/components/ReuseableTable'

export default function Home() {
  const [selectProvinceId,setSelectProvinceId] = useState(null)

  const [provinces,setProvinces] = useState([])
  const [districts,setDistricts] = useState([])
  const [communes,setCommunes] = useState([])
  const [villages,setVillages] = useState([])
  const [data,setData] = useState([])

  useEffect(() => {

    if(provinces.length === 0){
      return
    }

    setData(prev => {
      const id = uuidv4()

      return[
        ...prev,
        {
          id:id,
          provinces:provinces.find(province => province.id === selectProvinceId),
          totalDistricts:0,
          totalCommunes:0,
          totalVillages:0
        }
      ]
    })

  },[provinces])

  const onSaveProvince = (param) => {

    const id = uuidv4()
    setProvinces(prev => {

      prev.push({
        id:id,
        ...param
      })
      return prev
    })

    setSelectProvinceId(id)
    setProvinces([...provinces])
  }

  const onSaveDistrict = (param) => {

    const id = uuidv4() 

    setDistricts((pre) => {
      return [
        ...pre,
        {
          ...param,
          id: id,
        },
      ];
    });

    const result = data.map((pro, index) => {
      if (pro.provinces?.id === param.province_id) {
        pro.totalDistricts = pro.totalDistricts + 1;
      }
      return pro;
    });
    setData(result);

  }

  const onSaveCommune = (param) => {
    const id = uuidv4()

    const result = data.map((pro,index) => {

      const provinceId = districts.find(dis => dis.id === param.district_id).province_id

      if(pro.provinces?.id === provinceId){
        pro.totalCommunes = pro.totalCommunes + 1
      }

      return(pro)
    })

    setCommunes(prev => {
      return [
        ...prev,
        {
          id:id,
          ...param
        }
      ]
    })

    setData(result)
  }

  const onSaveVillage = (param) => {
    const id = uuidv4();

    const districtId = communes.find(com => com.id === param.commune_id)?.district_id;
    const provinceId = districts.find(dis => dis.id === districtId)?.province_id;

    const updatedData = data.map((pro) => {
        if (pro.provinces?.id === provinceId) {
            pro.totalVillages = pro.totalVillages + 1;
        }
        return pro;
    });

    const updatedVillages = [...villages, {
      id: id,
      ...param
    }];

    setVillages(updatedVillages);
    setData(updatedData);
  }


  const onDelete = (param) => {
    const provinceData = data.find(data => data.id === param)
    setData(data.filter(data => data.id !== param))   
    setDistricts(districts.filter(dis => dis.province_id !== provinceData.provinces.id));

    const districtData = districts.find(dis => dis.province_id === provinceData.provinces.id)
    setCommunes(communes.filter(com => com.district_id !== districtData.id))
    
    const communeData = communes.find(com => com.district_id === districtData.id)
    setVillages(villages.filter(vill => vill.commune_id !== communeData.id))
  }


  const testButton = () => {

    console.log(provinces);

    console.log(data);

  }

  return (
    
    <div className='w-[1200px] m-auto'>

      <ProvinceForm onSave={onSaveProvince} />
      <DistrictForm provinces={provinces} onSave={onSaveDistrict}/>
      <CommunesForm provinces={provinces} districts={districts} onSave={onSaveCommune}/>
      <VillageForm communes={communes} provinces={provinces} districts={districts} onSave={onSaveVillage}/>

      <Table data={data} onDelete={onDelete}/>

      <ReuseableTable label='District Data' data={districts} onDelete={setDistricts}/>

      <ReuseableTable label='Communes Data' data={communes} onDelete={setCommunes}/>

      <ReuseableTable label='Villages Data' data={villages} onDelete={setVillages}/>

      <div className='h-[50px]'></div>
      <button onClick={testButton} className='mt-8 bg-pink-500 p-4'>Test Button</button>


      
    
    </div>

  )
}
