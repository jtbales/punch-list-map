import ExampleData from "./ExampleData"

// console.log({ ExampleData })

class PunchListApi {

    Work = {
        // getOne: ({ id }) => axios.get(`${url}/${id}`),
        getAll: (params = {}) => ExampleData.PunchList.Work.getAll(params) // axios.get(url),
        // put: (toUpdate) => axios.put(url, toUpdate),
        // post: (toCreate) => axios.post(url, toCreate),
        // delete: ({ id }) => axios.delete(`${url}/${id}`)
    }

}

export default new PunchListApi();

