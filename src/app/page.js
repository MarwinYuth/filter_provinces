"use client"
import { ProvinceForm } from '@/components/ProvineceForm'
import { useMemo, useState } from 'react'
import { uuidv4 } from '@/utils'
import { DistrictForm } from '@/components/DistrictForm'
import { CommunesForm } from '@/components/CommunesForm'
import { VillageForm } from '@/components/VillageForm'
import { Table } from '@/components/Table'
import { data } from 'autoprefixer'
import { ReuseableTable } from '@/components/ReuseableTable'

export default function Home() {

  const [provinces,setProvinces] = useState([])
  const [districts,setDistricts] = useState([])
  const [communes,setCommunes] = useState([])
  const [villages,setVillages] = useState([])

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


  const onDeleteProvince = (param) => {

    const provinceId = param.province.id
    setProvinces(provinces.filter((province) => province.id !== provinceId));
  
    setDistricts(districts.filter(dis => dis.province_id !== provinceId));

    const districtData = districts.find(dis => dis.province_id === provinceId)
    setCommunes(communes.filter(com => com.district_id !== districtData.id))
    
    const communeData = communes.find(com => com.district_id === districtData.id)
    setVillages(villages.filter(vill => vill.commune_id !== communeData.id))
  }

  const onDeleteDistrict = (param) => {
    const districtId = param
    setDistricts(prev => prev.filter(dis => dis.id !== districtId))

    setCommunes(prev => prev.filter(com => com.district_id !== districtId))
    const communeData = communes.find(com => com.district_id === districtId)

    if(communeData){
      setVillages(prev => prev.filter(vil => vil.commune_id !== communeData.id))
    }
  }

  const onDeleteCommune = (param) => {
    const communeId = param

    setCommunes(prev => prev.filter(com => com.id !== communeId))
    setVillages(prev => prev.filter(vil => vil.commune_id !== communeId))
  }

  const onDeleteVillage = (param) => {
    const villageId = param
    setVillages(prev => prev.filter(vil => vil.id !== villageId))
  }

  const testButton = () => {
    console.log(provinces);
    console.log(districts);
    console.log(communes)
    console.log(villages);
  }

  return (
    
    <div className='w-[1200px] m-auto'>

      <ProvinceForm onSave={onSaveProvince} />
      <DistrictForm provinces={provinces} onSave={onSaveDistrict}/>
      <CommunesForm provinces={provinces} districts={districts} onSave={onSaveCommune}/>
      <VillageForm communes={communes} provinces={provinces} districts={districts} onSave={onSaveVillage}/>

      <Table data={data} onDelete={onDeleteProvince} />

      <ReuseableTable label='District Data' data={districts} onDelete={onDeleteDistrict}/>

      <ReuseableTable label='Communes Data' data={communes} onDelete={onDeleteCommune}/>

      <ReuseableTable label='Villages Data' data={villages} onDelete={onDeleteVillage}/>

      <button onClick={testButton} className='mt-8 bg-pink-500 p-4'>Test Button</button>
      <div className='h-[50px]'></div>

      {/* <Modal data={viewDetail} onChangePopUp={setPopUp} isVisible={popUp} onUpdate={onUpdate}/> */}
    
    </div>

  )
}
