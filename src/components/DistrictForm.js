import { useState } from 'react'
import { Input,SelectInput } from './Input'

export const DistrictForm = ({onSave,provinces}) => {

    const [form,setForm] = useState({province_id:'',name:'',name_km:''})


    const onChange = (e) => {

        const field = e.target.name
        const value = e.target.value

        setForm({...form,[field]:value})

    }

    const onClickSave = () => {
        onSave(form)

        setForm({province_id:'',name:'',name_km:''})
    }

    return(

        <div>

            <form>

                <h1 className="font-bold mt-4 text-[20px]">Districts</h1>
                <Input label='name' name='name' placeholder='Name Latin' value={form.name} onChange={onChange}/>
                <Input label='name km' name='name_km' placeholder='Name km' value={form.name_km} onChange={onChange}/>
                <SelectInput label='Provinces' name='province_id' placeholder='Please Select Provinces' options={provinces} value={form.province_id} onChange={onChange}/>

                <button onClick={onClickSave} class="h-10 px-6 font-semibold rounded-md bg-white text-black mt-2" type="button">
                    Submit
                </button>

            </form>

        </div>

    )

}