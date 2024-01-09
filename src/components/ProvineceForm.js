import { useState } from "react"
import { Input } from "./Input"

export const ProvinceForm = ({onSave,onEdit}) => {

    const [form,setForm] = useState({name:'',name_km:''})


    if(onEdit){
       console.log(onEdit);
    }

    const onChange = (e) => {
        const field = e.target.name
        const value = e.target.value

        setForm({...form,[field]:value})
    }

    const onClickSave = () => {

        if(form.name === '' || form.name_km === ''){
            return null
        }
        onSave(form)

        setForm({name:'',name_km:''})
    }

    return(

        <div>

            <form>

                <h1 className="font-bold mt-4 text-[20px]">Provinces</h1>

                <Input label='Name Latin' name='name' placeholder='Name Latin' value={form.name} onChange={onChange}/>
                <Input label='Name Khmer' name='name_km' placeholder='Name km' value={form.name_km} onChange={onChange}/>
                
                <button onClick={onClickSave} class="h-10 px-6 font-semibold rounded-md bg-white text-black mt-2" type="button">
                    Submit
                </button>

            </form>
            
        </div>

    )

}