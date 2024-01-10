import { useState } from "react"
import { Input, SelectInput } from "./Input"

export const CommunesForm = ({onSave,provinces,districts}) => {

    const [form,setForm] = useState({district_id:'',name:'',name_km:''})

    const [districtData,setDistrictData] = useState([])

    const handleSelect = (e) => {

        const province_id = e.target.value

        const district = districts.filter(dis => dis.province_id === province_id)

        setDistrictData(district)
        console.log(districtData);
    }

    const onChange = (e) => {

        const field = e.target.name
        const value = e.target.value

        setForm({...form,[field]:value})
    }

    const onClickSave = () => {

        if(form.district_id === '' || form.name === '' || form.name_km === ''){
            return null
        }
        setForm({district_id:'',name:'',name_km:''})
        onSave(form)

        setDistrictData([])
    }

    return(

        <div>

            <form>

                <h1 className="font-bold mt-4 text-[20px]">Communes</h1>
                <Input label='name' name='name' value={form.name} placeholder='Name Latin' onChange={onChange}/>
                <Input label='name km' name='name_km' value={form.name_km} placeholder='Name Km' onChange={onChange}/>

                <SelectInput label='province' name='province_id' placeholder='Please Select Province' options={provinces} onChange={handleSelect}/>
                <SelectInput label='District' name='district_id' placeholder='Please Select Districts' value={form.district_id} options={districtData} onChange={onChange}/>

                <button onClick={onClickSave} class="h-10 px-6 font-semibold rounded-md bg-white text-black mt-2" type="button">
                    Submit
                </button>

            </form>

        </div>

    )

}