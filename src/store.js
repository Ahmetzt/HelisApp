import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { router } from "./router"
import i18n from "./i18n/index"

Vue.use(Vuex)

const store = new Vuex.Store({
    state : {
        loginUserId: null,
        roleId: null,
        SessionKey: "",
        BookingId: null,
        PossessionId: null,
        CurrentPossession: null,
        CurrentLocation: null,
        Lang: "tr",
        locations: [],
        airports: [],
        MansionList: [],
        vehicles: [],
        restaurants: [],
        ActivityType: [],
        AssistantType: [],
        SecondaryList: [],
        selectedLocation: {
            IlId: null,
            IlceId: null,
        },
        isSearched: false,
        ResultText: "Talebiniz başarı ile elimize ulaştı. En kısa sürede asistanlarımız size ulaşacaktır.",
        isResult: false,
        Orders: [],
        OrderTypes: [
            { OrderType: 1, OrderName: "Konaklama" }, 
            { OrderType: 2, OrderName: "Transfer" }, 
            { OrderType: 3, OrderName: "Rent a Car & Boat" }, 
            { OrderType: 4, OrderName: "Restaurant" }, 
            { OrderType: 5, OrderName: "Kuru Temizleme" }, 
            { OrderType: 6, OrderName: "Aktiviteler" }, 
            { OrderType: 7, OrderName: "Asistan" }, 
        ],
        OrderStatus: [
            { OrderStatus: 1, StatusName: "Talep Oluşturuldu" }, 
            { OrderStatus: 2, StatusName: "Bekliyor" }, 
            { OrderStatus: 3, StatusName: "Teklif Sunuldu" }, 
            { OrderStatus: 4, StatusName: "Teklif Kabul Edildi" }, 
            { OrderStatus: 5, StatusName: "Teklif Red Edildi" }, 
        ],
        PossessionStatus: [
            { PossessionStatus: 1, PossessionName: "Müşteri Sahip" }, 
            { PossessionStatus: 2, PossessionName: "Müşteri Sahip Kiralık" }, 
            { PossessionStatus: 3, PossessionName: "Firma Sahip Satılık" }, 
            { PossessionStatus: 4, PossessionName: "Firma Sahip Kiralık" }, 
            { PossessionStatus: 5, PossessionName: "Firma Sahip Ziyaretlik" }, 
            { PossessionStatus: 6, PossessionName: "Kullanım Dışı" }, 
        ],
        RentableStatus: [
            { RentableStatus: 1, RentableName: " Yeni İstek" }, 
            { RentableStatus: 2, RentableName: " Teklif Sunuldu" }, 
            { RentableStatus: 3, RentableName: " Sözleşme Aşamasında" }, 
            { RentableStatus: 4, RentableName: " Kabul Edildi" }, 
            { RentableStatus: 5, RentableName: " Reddedildi" }, 
        ],
        Mansions: [],
        Blocks: [],
        Possessions: [],
    },
    mutations : {
        setSession(state, data) {
            state.roleId = data.RoleId
            state.SessionKey = data.Session
            state.loginUserId = data.UserId
            state.BookingId = data.BookingId
            state.PossessionId = data.PossessionId
            state.CurrentPossession = parseInt(data.BookingId) || parseInt(data.PossessionId)
            state.Lang = data.Lang
            state.CurrentLocation = data.CurrentLocation
        },
        clearSession(state) {
            state.loginUserId = null
            state.roleId = null
            state.SessionKey = ""
        },
        updateLocationList(state, item) {
            state.locations.push(item);
        },
        updateAirportList(state, item) {
            state.airports.push(item);
        },
        updateMansionList(state, item) {
            state.MansionList.push(item);
        },
        updateVehiclesList(state, item) {
            state.vehicles.push(item);
        },
        updateRestaurantsList(state, item) {
            state.restaurants.push(item);
        },
        updateActivityTypeList(state, item) {
            state.ActivityType.push(item);
        },
        updateAssistantTypeList(state, item) {
            state.AssistantType.push(item);
        },
        updateResultText(state, item) {
            state.ResultText = item
            state.isResult = true
        },
        updateOrderList(state, item) {
            state.Orders.push(item);
        },
        updateMansions(state, item) {
            state.Mansions.push(item);
        },
        updateBlocks(state, item) {
            state.Blocks.push(item);
        },
        updatePossessions(state, item) {
            state.Possessions.push(item);
        },
        updateSecondary(state, item) {
            state.SecondaryList.push(item);
        },
        removeLocalStorage() {
            localStorage.removeItem("RoleId")
            localStorage.removeItem("Session")
            localStorage.removeItem("UserId")
            localStorage.removeItem("BookingId")
            localStorage.removeItem("PossessionId")
            localStorage.removeItem("CurrentPossession")
            localStorage.removeItem("CurrentLocation")
            localStorage.removeItem("Lang")
        },
        SetLanguage(state, locale) {
            state.Lang = locale
            state.OrderTypes.forEach(e => {
                e.OrderName = i18n.t(`OrderTypes.${e.OrderType}`)
            });
            state.OrderStatus.forEach(e => {
                e.StatusName = i18n.t(`OrderStatus.${e.OrderStatus}`)
            });
            state.PossessionStatus.forEach(e => {
                e.PossessionName = i18n.t(`PossessionStatus.${e.PossessionStatus}`)
            });
            state.RentableStatus.forEach(e => {
                e.RentableName = i18n.t(`RentableStatus.${e.RentableStatus}`)
            });
        },
    },
    actions : {
        SetLocale({ commit }, locale ){
            localStorage.setItem("Lang", locale)
            i18n.locale =        locale
            commit("SetLanguage", locale)
        },
        async initAuth({ commit, dispatch, state }) {
            try {
                let SessionKey = localStorage.getItem("Session")
                if(SessionKey != null) {
                    const response = await axios.get("Session/RenewSession?" + "SessionKey=" + SessionKey)
                    state.isResult = false

                    if(response.data) {
                        let SessionData = {}
                        let data = response.data
                        
                        localStorage.setItem("RoleId", data.RoleId)
                        localStorage.setItem("Session", data.Session)
                        localStorage.setItem("UserId", data.UserId)
                        localStorage.setItem("BookingId", data.BookingId)
                        localStorage.setItem("PossessionId", data.PossessionId)
                        localStorage.setItem("CurrentPossession", parseInt(data.BookingId) || parseInt(data.PossessionId))
                        localStorage.setItem("CurrentLocation", data.CurrentLocation)
                        localStorage.setItem("Lang", data.Lang)

                        SessionData.RoleId =            localStorage.getItem("RoleId")
                        SessionData.Session =           localStorage.getItem("Session")
                        SessionData.UserId =            localStorage.getItem("UserId")
                        SessionData.BookingId =         localStorage.getItem("BookingId")
                        SessionData.PossessionId =      localStorage.getItem("PossessionId")
                        SessionData.CurrentPossession = parseInt(localStorage.getItem("BookingId")) || parseInt(localStorage.getItem("PossessionId"))
                        SessionData.CurrentLocation =   localStorage.getItem("CurrentLocation")
                        SessionData.Lang =              localStorage.getItem("Lang")
                        i18n.locale =                   localStorage.getItem("Lang")
                        
                        commit("setSession", SessionData)

                        dispatch("getLocationList")
                        dispatch("getMansionList")
                        dispatch("getAirportList")
                        dispatch("getVehiclesList")
                        dispatch("getRestaurantsList")
                        dispatch("getActivityTypeList")
                        dispatch("getAssistantTypeList")
                        
                        dispatch("SetLocale", localStorage.getItem("Lang"))

                        return true
                    } else {
                        router.push("/auth")
                        commit("removeLocalStorage");
                        dispatch("ListMansionsNS")
                        return false
                    }
                } else {
                    if (router.currentRoute.fullPath != "/auth") {
                        router.push("/auth")
                    }
                    dispatch("ListMansionsNS")
                }
            } catch (error) {
                dispatch("SetError", error)
            }

            // let SessionKey = localStorage.getItem("Session")
            // if(SessionKey != null) {
            //     return axios.get("Session/RenewSession?" + "SessionKey=" + SessionKey)
            //         .then(response => {
            //             state.isResult = false

            //             if(response.data) {
            //                 let SessionData = {}
            //                 let data = response.data
                            
            //                 localStorage.setItem("RoleId", data.RoleId)
            //                 localStorage.setItem("Session", data.Session)
            //                 localStorage.setItem("UserId", data.UserId)
            //                 localStorage.setItem("BookingId", data.BookingId)
            //                 localStorage.setItem("PossessionId", data.PossessionId)
            //                 localStorage.setItem("CurrentPossession", parseInt(data.BookingId) || parseInt(data.PossessionId))
            //                 localStorage.setItem("CurrentLocation", data.CurrentLocation)
            //                 localStorage.setItem("Lang", data.Lang)

            //                 SessionData.RoleId =            localStorage.getItem("RoleId")
            //                 SessionData.Session =           localStorage.getItem("Session")
            //                 SessionData.UserId =            localStorage.getItem("UserId")
            //                 SessionData.BookingId =         localStorage.getItem("BookingId")
            //                 SessionData.PossessionId =      localStorage.getItem("PossessionId")
            //                 SessionData.CurrentPossession = parseInt(localStorage.getItem("BookingId")) || parseInt(localStorage.getItem("PossessionId"))
            //                 SessionData.CurrentLocation =   localStorage.getItem("CurrentLocation")
            //                 SessionData.Lang =              localStorage.getItem("Lang")
            //                 i18n.locale =                   localStorage.getItem("Lang")
                            
            //                 commit("setSession", SessionData)

            //                 dispatch("getLocationList")
            //                 dispatch("getMansionList")
            //                 dispatch("getAirportList")
            //                 dispatch("getVehiclesList")
            //                 dispatch("getRestaurantsList")
            //                 dispatch("getActivityTypeList")
            //                 dispatch("getAssistantTypeList")
                            
            //                 dispatch("SetLocale", localStorage.getItem("Lang"))

            //                 // router.push("/")
            //                 return true
            //             } else {
            //                 router.push("/auth")
            //                 commit("removeLocalStorage");
            //                 dispatch("ListMansionsNS")
            //                 return false
            //             }
            //         }
            //     )
            //     .catch((error) => {
            //         dispatch("SetError", error)
            //     })
            // } else {
            //     if (router.currentRoute.fullPath != "/auth") {
            //         router.push("/auth")
            //     }
            //     dispatch("ListMansionsNS")
            // }
        },
        async login({ dispatch, commit }, authData) {
            try {
                const response = await axios.get("Session/UserLogin?" + "UserName=" + authData.email + "&Password=" + authData.password)
                let data = response.data

                if (data.UserId > 0) {
                    localStorage.setItem("RoleId", data.RoleId)
                    localStorage.setItem("Session", data.Session)
                    localStorage.setItem("UserId", data.UserId)
                    localStorage.setItem("BookingId", data.BookingId)
                    localStorage.setItem("PossessionId", data.PossessionId)
                    localStorage.setItem("CurrentPossession", parseInt(data.BookingId) || parseInt(data.PossessionId))
                    localStorage.setItem("CurrentLocation", data.CurrentLocation)
                    localStorage.setItem("Lang", data.Lang)
                    commit("setSession", data)
                    router.push("/")
                } else {
                    commit("removeLocalStorage")
                }
                return response.data
            } catch (error) {
                if (error.ErrorCode > -900) {
                    return error
                } else {
                    dispatch("SetError", error)
                }
            }
        },
        logout({ commit, dispatch, state }) {
            axios.post("Session/Logout?SessionKey=" + state.SessionKey)
            commit("clearSession")
            commit("removeLocalStorage");
            dispatch("ListMansionsNS")
            router.replace("/auth")
        },
        async sessionControl({ state, dispatch }) {
            const response = await axios.get("Session/SessionUser?" + "SessionKey=" + state.SessionKey)
            if (response.data) {
                return true
            } else {
                dispatch("logout")
            }
        },
        async getLocationList({ dispatch, commit, state }) {
            //Lokasyon Verilerini yükle
            try {
                const response = await axios.get("HelisData/ListLocations")
                state.locations = []
                let data = response.data
                for (let key in data) {
                    data[key].key = key
                    commit("updateLocationList", data[key])
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async getMansionList({ dispatch, commit, state }) {
            //Proje Verilerini yükle
            try {
                const response = await axios.get("Get/ListMansion")
                state.MansionList = []
                let data = response.data
                for (let key in data) {
                    data[key].key = key
                    commit("updateMansionList", data[key])
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async getAirportList({ dispatch, commit, state }) {
            //Hava Alanı Verilerini yükle
            try {
                const response = await axios.get("Get/ListAirports")
                state.airports = []
                let data = response.data
                for (let key in data) {
                    data[key].key = key
                    commit("updateAirportList", data[key])
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async getVehiclesList({ dispatch, commit, state }) {
            try {
                const response = await axios.get("Module/ListVehicle")
                state.vehicles = []
                let data = response.data
                for (let key in data) {
                    data[key].key = key
                    commit("updateVehiclesList", data[key])
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async getRestaurantsList({ dispatch, commit, state }) {
            try {
                const response = await axios.get("Module/ListRestaurant")
                state.restaurants = []
                let data = response.data
                for (let key in data) {
                    data[key].key = key
                    commit("updateRestaurantsList", data[key])
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async getActivityTypeList({ dispatch, commit, state }) {
            try {
                const response = await axios.get("Get/ListActivityType")
                state.ActivityType = []
                let data = response.data
                for (let key in data) {
                    data[key].key = key
                    commit("updateActivityTypeList", data[key])
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async getAssistantTypeList({ dispatch, commit, state }) {
            try {
                const response = await axios.get("Get/ListAssistantType")
                state.AssistantType = []
                let data = response.data
                for (let key in data) {
                    data[key].key = key
                    commit("updateAssistantTypeList", data[key])
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async getOrdersHistory({ commit, state, dispatch }, searchData) {
            //Talep Verilerini yükle
            try {
                const response = await axios.get("Get/ListOrders?" + "OrderType=" + searchData.OrderType + "&BeginDate=" + searchData.BeginDate +
                    "&EndDate=" + searchData.EndDate + "&OrderStatus=" + searchData.OrderStatus + "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
                state.Orders = []
                let data = response.data

                if (data.length > 0) {
                    for (let key in data) {
                        data[key].key = key
                        commit("updateOrderList", data[key])
                    }
                } else {
                    dispatch("sessionControl")
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        setTimeoutTimer({dispatch}, expiresIn) {
            setTimeout(() => {
                dispatch("logout")
            }, expiresIn)
        },
        resultRoute({ commit }, text) {
            commit("updateResultText", text);
            router.replace("/result")
        },
        async setMansionSearch({ dispatch, commit, state, getters}, searchData) {
            //Hotel Verilerini çağır
            state.MansionList = []
            try {
                const response = await axios.get("Set/ListMansions?" + "BeginDate=" + searchData.BeginDate + "&EndDate=" + searchData.EndDate + "&Adults=" + searchData.Adults +
                    "&Kids=" + searchData.Kids + "&IlId=" + searchData.IlId + "&IlceId=" + searchData.IlceId + "&SessionKey=" + state.SessionKey)
                let data = response.data
                for (let key in data) {
                    commit("updateMansionList", data[key])
                }

                state.selectedLocation.IlId = searchData.IlId
                state.selectedLocation.IlceId = searchData.IlceId
                return getters.getMansionsList
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async SetMansionOrder({ state, dispatch }, MansionOrder) {
            //Hotel Seçili İsteği gönder
            try {
                const response = await axios.post("Set/AddMansionOrder?" + "MansionId=" + MansionOrder.MansionId + "&BeginDate=" + MansionOrder.BeginDate + "&EndDate=" + MansionOrder.EndDate +
                    "&Adults=" + MansionOrder.Adults + "&Kids=" + MansionOrder.Kids + "&PossessionId=" + state.CurrentPossession + "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
                let data = response.data

                if (data > 0) {
                    // return data
                    dispatch("resultRoute", MansionOrder.ResultText)
                } else {
                    dispatch("sessionControl")
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async SetTransferOrder({ state, dispatch }, TransferOrder) {
            try {
                const response = await axios.post("Set/AddTransferOrder?" + "Description=" + TransferOrder.Description + "&AirportId=" + TransferOrder.AirportId + "&Adults=" + TransferOrder.Adults +
                    "&Kids=" + TransferOrder.Kids + "&FromToType=" + TransferOrder.FromToType + "&RequestDate=" + TransferOrder.RequestDate +
                    "&PossessionId=" + state.CurrentPossession + "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
                let data = response.data

                if (data > 0) {
                    // return data
                    dispatch("resultRoute", TransferOrder.ResultText)
                } else {
                    dispatch("sessionControl")
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async SetRentOrder({ state, dispatch }, RentOrder) {
            try {
                const response = await axios.post("Set/AddRentOrder?" + "VehicleId=" + RentOrder.VehicleId + "&BeginDate=" + RentOrder.BeginDate + "&EndDate=" + RentOrder.EndDate +
                    "&PossessionId=" + state.CurrentPossession + "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
                let data = response.data

                if (data > 0) {
                    // return data
                    dispatch("resultRoute", RentOrder.ResultText)
                } else {
                    dispatch("sessionControl")
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async SetRestaurantOrder({ state, dispatch }, RestaurantOrder) {
            try {
                const response = await axios.post("Set/AddRestaurantOrder?" + "RestaurantId=" + RestaurantOrder.RestaurantId + "&RequestDate=" + RestaurantOrder.RequestDate +
                    "&Adults=" + RestaurantOrder.Adults + "&Kids=" + RestaurantOrder.Kids + "&PossessionId=" + state.CurrentPossession + "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
                let data = response.data

                if (data > 0) {
                    // return data
                    dispatch("resultRoute", RestaurantOrder.ResultText)
                } else {
                    dispatch("sessionControl")
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async SetActivityOrder({ state, dispatch }, ActivityOrder) {
            try {
                const response = await axios.post("Set/AddActivityOrder?" + "ActivityTypeId=" + ActivityOrder.ActivityTypeId + "&IlId=" + ActivityOrder.IlId + "&IlceId=" + ActivityOrder.IlceId +
                    "&RequestDate=" + ActivityOrder.RequestDate + "&Adults=" + ActivityOrder.Adults + "&Kids=" + ActivityOrder.Kids + "&PossessionId=" + state.CurrentPossession +
                    "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
                let data = response.data

                if (data > 0) {
                    // return data
                    dispatch("resultRoute", ActivityOrder.ResultText)
                } else {
                    dispatch("sessionControl")
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async SetAssistantOrder({ state, dispatch }, AssistantOrder) {
            try {
                const response = await axios.post("Set/AddAssistantOrder?" + "AssistantTypeId=" + AssistantOrder.AssistantTypeId + "&RequestDate=" + AssistantOrder.RequestDate +
                    "&PossessionId=" + state.CurrentPossession + "&Note=" + AssistantOrder.Note + "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
                let data = response.data

                if (data > 0) {
                    // return data
                    dispatch("resultRoute", AssistantOrder.ResultText)
                } else {
                    dispatch("sessionControl")
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async SetCleanerOrder({ state, dispatch }, CleanerOrder) {
            try {
                const response = await axios.post("Set/AddCleanerOrder?" + "WomanMan=" + CleanerOrder.WomanMan + "&HomeTextiles=" + CleanerOrder.HomeTextiles + "&ChildProduct=" + CleanerOrder.ChildProduct +
                    "&RequestDate=" + CleanerOrder.RequestDate + "&PossessionId=" + state.CurrentPossession + "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
                let data = response.data

                if (data > 0) {
                    // return data
                    dispatch("resultRoute", CleanerOrder.ResultText)
                } else {
                    dispatch("sessionControl")
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        
        async Register({ dispatch }, registerData ) {
            try {
                const response = await axios.post("Session/Register?" + "UserName=" + registerData.UserName + "&Password=" + registerData.Password +
                    "&Mail=" + registerData.Mail + "&FirstName=" + registerData.FirstName + "&LastName=" + registerData.LastName +
                    "&Language=" + registerData.Language + "&DateOfBirth=" + registerData.DateOfBirth + "&Address=" + registerData.Address +
                    "&PhoneNumber=" + registerData.PhoneNumber + "&RoleId=" + registerData.RoleId + "&PossessionId=" + registerData.PossessionId +
                    "&BeginDate=" + registerData.BeginDate + "&EndDate=" + registerData.EndDate + "&Info=" + registerData.Info +
                    "&IsApproved=" + registerData.IsApproved + "&RegisterIP=" + registerData.RegisterIP)
                return response.data
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async RegisterSecondary({ dispatch, state }, registerData ) {
            try {
                const response = await axios.post("User/RegisterSecondary?" + "UserName=" + registerData.UserName + "&Password=" + registerData.Password +
                    "&Mail=" + registerData.Mail + "&FirstName=" + registerData.FirstName + "&LastName=" + registerData.LastName +
                    "&Language=" + registerData.Language + "&DateOfBirth=" + registerData.DateOfBirth + "&Address=" + registerData.Address +
                    "&PhoneNumber=" + registerData.PhoneNumber + "&RoleId=" + registerData.RoleId + "&SessionKey=" + state.SessionKey)
                return response.data
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async UpdateSecondary({ dispatch, state }, registerData ) {
            try {
                const response = await axios.post("User/UpdateSecondary?" + "&UserId=" + registerData.UserId + "&Password=" + registerData.Password +
                    "&FirstName=" + registerData.FirstName + "&LastName=" + registerData.LastName + "&Language=" + registerData.Language +
                    "&DateOfBirth=" + registerData.DateOfBirth + "&Address=" + registerData.Address +
                    "&PhoneNumber=" + registerData.PhoneNumber + "&RoleId=" + registerData.RoleId + "&SessionKey=" + state.SessionKey)
                return response.data
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async ListSecondary({ dispatch, commit, state }) {
            state.SecondaryList = []
            try {
                const response = await axios.get("User/ListSecondary?" + "UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
                let data = response.data
                for (let key in data) {
                    commit("updateSecondary", data[key])
                }
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async GetSelfInfo({ dispatch, state }) {
            try {
                const response = await axios.get("User/GetSelfInfo?" + "SessionKey=" + state.SessionKey)
                return response.data
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async UpdateSelf({ dispatch, state }, registerData ) {
            try {
                const response = await axios.post("User/UpdateSelf?" + "Password=" + registerData.Password + "&FirstName=" + registerData.FirstName + "&LastName=" + registerData.LastName +
                    "&Language=" + registerData.Language + "&DateOfBirth=" + registerData.DateOfBirth + "&Address=" + registerData.Address +
                    "&PhoneNumber=" + registerData.PhoneNumber + "&RoleId=" + registerData.RoleId + "&SessionKey=" + state.SessionKey)
                return response.data
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        
        //Mülk Sayfası
        async GetPropertyInfo({ dispatch, state }) {
            try {
                const response = await axios.get("Property/PropertyInfo?" + "PossessionId=" + state.PossessionId + "&SessionKey=" + state.SessionKey)
                return response.data
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async GetBookingHistory({ dispatch, state }) {
            try {
                const response = await axios.get("Property/BookingHistory?" + "PossessionId=" + state.PossessionId + "&SessionKey=" + state.SessionKey)
                return response.data
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async SetPossessionType({ dispatch, state }, PossessionType ) {
            try {
                const response = await axios.post("Property/SetPossessionType?" + "PossessionId=" + state.PossessionId + "&PossessionType=" + PossessionType + "&SessionKey=" + state.SessionKey)
                return response.data
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async GetRentableInfo({ dispatch, state }) {
            try {
                const response = await axios.get("Property/RentableInfo?" + "PossessionId=" + state.PossessionId + "&SessionKey=" + state.SessionKey)
                return response.data
            } catch (error) {
                dispatch("SetError", error)
            }
        },
        async SetRentable({ dispatch, state }, RentData ) {
            try {
                const response = await axios.post("Property/AddRentable?" + "PossessionId=" + state.PossessionId + "&Year=" + RentData.Year +
                    "&Info=" + RentData.Info + "&timeList=" + RentData.TimeList + "&SessionKey=" + state.SessionKey)
                return response.data
            } catch (error) {
                dispatch("SetError", error)
            }
        },

        //No Session
        async ListMansionsNS({ commit, state }) {
            const response = await axios.get("Property/ListMansionsNS")
            state.Mansions = []
            let data = response.data
            for (let key in data) {
                commit("updateMansions", data[key])
            }
        },
        async ListBlocksNS({ commit, state }, MansionId) {
            const response = await axios.get("Property/ListBlocksNS?MansionId=" + MansionId)
            state.Blocks = []
            let data = response.data
            for (let key in data) {
                commit("updateBlocks", data[key])
            }
        },
        async ListPossessionsNS({ commit, state }, Payload) {
            const response = await axios.get("Property/ListPossessionsNS?MansionId=" + Payload.MansionId + "&BlockId=" + Payload.BlockId)
            state.Possessions = []
            let data = response.data
            for (let key in data) {
                commit("updatePossessions", data[key])
            }
        },

        //Error Management
        SetError({ dispatch, state }, Error) {
            let URL = Error.request.responseURL
            let Msg = Error.response.data.ErrorMsg
            let Code = Error.response.data.ErrorCode
            let Page = window.location.pathname
            console.log("Caught", Error);

            if (Code > -200) { //-100 ile -200 arası Session Error Olacak
                dispatch("sessionControl");
            } else {
                axios.post("HelisData/AddError?Application=HelisAPP&Module=" + Page + "&Process=" + URL + "&Message=" + Msg + "&DB_Action=1&DB_User=" + state.loginUserId)
            }
        },
    },
    getters : {
        isAuthenticated(state) {
            return state.SessionKey !== ""
        },
        getSessionDetail(state) {
            return { 
                roleId: state.roleId, 
                SessionKey: state.SessionKey, 
                loginUserId: state.loginUserId, 
                BookingId: state.BookingId, 
                PossessionId: state.PossessionId, 
                CurrentPossession: state.CurrentPossession,
                CurrentLocation: state.CurrentLocation
            }
        },
        isResultPage(state) {
            return state.isResult
        },
        getLocations(state) {
            return state.locations;
        },
        getAirports(state) {
            return state.airports;
        },
        getVehicles(state) {
            return state.vehicles;
        },
        getVehiclesByType: state => Type => {
            return state.vehicles.filter(e => e.Type == Type);
        },
        getRestaurants(state) {
            return state.restaurants;
        },
        getActivityType(state) {
            return state.ActivityType;
        },
        getAssistantType(state) {
            return state.AssistantType;
        },
        getLocation(state) {
            return key => state.locations.filter(element => {
                return element.key == key;
            })
        },
        getMansionsList(state) {
            return state.MansionList
        },
        getResultText(state) {
            return state.ResultText
        },
        getOrders(state) {
            return state.Orders;
        },
        getOrderTypes(state) {
            return state.OrderTypes;
        },
        getOrderTypesById: state => OrderType => {
            return state.OrderTypes.find(element => 
                element.OrderType === OrderType
            )
        },
        getOrderStatus(state) {
            return state.OrderStatus;
        },
        getOrderStatusById: state => OrderStatus => {
            return state.OrderStatus.find(element => 
                element.OrderStatus === OrderStatus
            )
        },
        getMansions(state) {
            return state.Mansions;
        },
        getBlocks(state) {
            return state.Blocks;
        },
        getPossessions(state) {
            return state.Possessions;
        },
        getPossessionsByBlock: state => BlockId => {
            return state.Possessions.filter(element =>
                element.BlockId == BlockId
            )
        },
        getPossessionStatus(state) {
            return state.PossessionStatus;
        },
        getRentableStatus(state) {
            return state.RentableStatus;
        },
        getRentableStatusNameById: state => Status => {
            return state.RentableStatus.find(element => 
                element.RentableStatus === Status
            ).RentableName
        },
        checkMansionBlocky: state => MansionId => {
            return state.Mansions.find(m =>
                m.MansionId == MansionId).IsBlocky
        },
        getSecondary(state) {
            return state.SecondaryList;
        }
    }
})

export default store