export const fileUpload = async (file) => {

    if (!file) throw new Error('File have not been uploaded')
  
    const url = `https://api.cloudinary.com/v1_1/dew4etjvl/upload`
    
    const formData = new FormData()
    
    formData.append('upload_preset', 'journal-app-react-course')
    formData.append('file', file)
    try {
        const response = await fetch(url, {
            method: 'POST', 
            body: formData,
        })

        if (!response.ok) throw new Error('Could not upload image')

        const cloudData = await response.json()

        return cloudData.secure_url
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
}