import React from 'react'
import InputLabel from '../InputLabel'
import TextInput from '../TextInput'
import ImageInput from '../ImageInput'
import MapInput from '../MapInput'

export default function ExperienceForm() {


    return (
        <form>
            <div className='field-group'>
                <InputLabel value="Títol" />
                <TextInput type="text" name="titol" />
            </div>
            <div className='field-group'>
                <InputLabel value="Descripció de l'expriència" />
                <TextInput name="descripcio" />
            </div>
            <div className='field-group'>
                <InputLabel value="Descripció de l'expriència" />
                <ImageInput
                    accept="image/*"
                    onChange={(e) => setData('imagen', e.target.files[0])}
                />
            </div>
            <div className='field-group'>
                <InputLabel value="Descripció de l'expriència" />
                <MapInput />
            </div>
            <div className='field-group'>
                <InputLabel value="Categories" />

            </div>
        </form>
    )
}
