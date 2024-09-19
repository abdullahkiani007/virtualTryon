

const userImageLink = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Emraan_Filmfare_Magazine_Launch.jpg/220px-Emraan_Filmfare_Magazine_Launch.jpg";
const clothImageLink = "https://variety.com/wp-content/uploads/2023/03/John-Wick-3.jpg?w=1000&h=562&crop=1";

export async function tryOn(userImage, clothImage, category) {
    const formData = new FormData();
    formData.append('userImage', userImage);
    formData.append('clothImage', clothImage);
    formData.append('category', category);

    console.log("formData", formData);

    const response = await fetch('http://localhost:8000/tryon/', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

    

    
}


// // Simulate a delay of 10 seconds using a Promise
// return new Promise((resolve) => {
//     setTimeout(async () => {
//         // Uncomment the fetch request if you want to make an actual API call
//         // const response = await fetch(apiUrl, {
//         //     method: 'POST',
//         //     headers: {
//         //         "Content-Type": "application/json",
//         //         "Authorization": `Bearer ${api_key}`
//         //     },
//         //     body: JSON.stringify({
//         //         user_img_name: userImageLink,
//         //         cloth_img_name: clothImageLink,
//         //         category: category,
//         //         caption: 'red, T-shirt'
//         //     })
//         // });

//         // console.log("response", response);

//         // if (!response.ok) {
//         //     throw new Error(`HTTP error! status: ${response.status}`);
//         // }

//         // const data = await response.json();
//         // console.log(data);

//         // Simulated URL
//         const url = "https://selfit-deploy-1256039085.cos.accelerate.myqcloud.com/ClothData/Publics/Users/ovB-x639B8QwdfF7kQYS9QKdK6u8/FastInfs/BPL7XU0VI35767/res_img.jpg";
//         resolve({
//             status: "success",
//             url: url
//         });
//     }, 10000);
// });