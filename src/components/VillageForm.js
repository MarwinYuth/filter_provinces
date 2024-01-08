import { useState } from "react"
import { Input, SelectInput } from "./Input"

export const VillageForm = ({onSave,communes,provinces,districts}) => {

    const [form,setForm] = useState({commune_id:'',name:'',name_km:''})

    const [districtData,setDistrictData] = useState([])
    const [communeData,setCommuneData] = useState([])

    const onChange = (e) => {
        const field = e.target.name
        const value = e.target.value

        setForm({...form,[field]:value})
    }

    const handleProvinceSelect = (e) => {

        const province_id = e.target.value
        const district = districts.filter(dis => dis.province_id === province_id)
        
        setDistrictData(district)
        setCommuneData([])
    }

    const handleDistrictSelect = (e) => {

        const district_id = e.target.value
        
        const commune = communes.filter(com => com.district_id === district_id)

        setCommuneData(commune)
        console.log((commune));
    }

    const onSaveVillage = () => {

        onSave(form)

        
        setDistrictData([])
        setCommuneData([])
        setForm({commune_id:'',name:'',name_km:''})
    }

    return(

        <div>

            <form>

                <h1 className="font-bold mt-4 text-[20px]">Village</h1>
                <Input label='Village' name='name' value={form.name} placeholder='name Latin' onChange={onChange}/>
                <Input label='Village Km' name='name_km' value={form.name_km} placeholder='name Km' onChange={onChange}/>

                <SelectInput label='Province' name='province_id' placeholder='Please Select Province' options={provinces} onChange={handleProvinceSelect}/>
                <SelectInput label='Districts' name='district_id' placeholder='Please Select District' options={districtData} onChange={handleDistrictSelect}/>
                <SelectInput label='Communes' name='commune_id' value={form.commune_id} placeholder='Please Select Commune' options={communeData} onChange={onChange}/>

                <button onClick={onSaveVillage} class="h-10 px-6 font-semibold rounded-md bg-white text-black mt-2" type="button">
                    Submit
                </button>

            </form>

        </div>

    )
}