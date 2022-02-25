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
            state.Lang = data.Lang
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
            // localStorage.setItem("Lang", locale)
            i18n.locale =        locale
            commit("SetLanguage", locale)
        },
        initAuth({ commit, dispatch, state }) {
            let SessionKey = localStorage.getItem("Session")
            if(SessionKey != null) {
                axios.get("Session/SessionControl?" + "SessionKey=" + SessionKey)
                    .then(response => {
                        state.isResult = false

                        if(response.data) {
                            let SessionData = {}
                            
                            SessionData.RoleId =        localStorage.getItem("RoleId")
                            SessionData.Session =       localStorage.getItem("Session")
                            SessionData.UserId =        localStorage.getItem("UserId")
                            SessionData.BookingId =     localStorage.getItem("BookingId")
                            SessionData.PossessionId =  localStorage.getItem("PossessionId")
                            SessionData.Lang =          localStorage.getItem("Lang")
                            i18n.locale =               localStorage.getItem("Lang")
                            
                            commit("setSession", SessionData)

                            dispatch("getLocationList")
                            dispatch("getAirportList")
                            dispatch("getVehiclesList")
                            dispatch("getRestaurantsList")
                            dispatch("getActivityTypeList")
                            dispatch("getAssistantTypeList")
                            
                            dispatch("SetLocale", localStorage.getItem("Lang"))

                            if (window.location.pathname != "/") {
                                router.push("/")
                            }
                        } else {
                            router.push("/auth")
                            commit("removeLocalStorage");
                            dispatch("ListMansionsNS")
                            return false
                        }
                    }
                )
                .catch((error) => {
                    dispatch("SetError", error)
                })
            } else {
                if (router.currentRoute.fullPath != "/auth") {
                    router.push("/auth")
                }
                dispatch("ListMansionsNS")
            }
        },
        login({ dispatch, commit }, authData) {

            return axios.get("Session/UserLogin?" + "UserName=" + authData.email + "&Password=" + authData.password)
                .then(response => {
                let data = response.data;
                
                if (data.UserId > 0) {
                    localStorage.setItem("RoleId", data.RoleId)
                    localStorage.setItem("Session", data.Session)
                    localStorage.setItem("UserId", data.UserId)
                    localStorage.setItem("BookingId", data.BookingId)
                    localStorage.setItem("PossessionId", data.PossessionId)
                    localStorage.setItem("Lang", data.Lang)
                    commit("setSession", data)
                } else {
                    commit("removeLocalStorage");
                }
                return response.data
            })
            .catch((error) => {
                if (error.ErrorCode > -900) {
                    return error
                } else {
                    dispatch("SetError", error)
                }
            })
        },
        logout({ commit, dispatch, state }) {
            axios.get("Session/Logout?SessionKey=" + state.SessionKey)
            commit("clearSession")
            commit("removeLocalStorage");
            dispatch("ListMansionsNS")
            router.replace("/auth")
        },
        sessionControl({ state, dispatch }) {
            axios.get("Session/SessionUser?" + "SessionKey=" + state.SessionKey)
                .then(response => {
                    if(response.data) {
                        return true
                    } else {
                        dispatch("logout")
                    }
                }
            )
        },
        getLocationList({ dispatch, commit, state }) {
            //Lokasyon Verilerini yükle
            axios.get("HelisData/ListLocations")
            .then(response => {
                state.locations = []
                let data = response.data;
                for (let key in data) {
                    data[key].key = key;
                    commit("updateLocationList", data[key]);
                }
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        getAirportList({ dispatch, commit, state }) {
            //Hava Alanı Verilerini yükle
            axios.get("Get/ListAirports")
            .then(response => {
                state.airports = []
                let data = response.data;
                for (let key in data) {
                    data[key].key = key;
                    commit("updateAirportList", data[key]);
                }
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        getVehiclesList({ dispatch, commit, state }) {
            axios.get("Module/ListVehicle")
            .then(response => {
                state.vehicles = []
                let data = response.data;
                for (let key in data) {
                    data[key].key = key;
                    commit("updateVehiclesList", data[key]);
                }
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        getRestaurantsList({ dispatch, commit, state }) {
            axios.get("Module/ListRestaurant")
            .then(response => {
                state.restaurants = []
                let data = response.data;
                for (let key in data) {
                    data[key].key = key;
                    commit("updateRestaurantsList", data[key]);
                }
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        getActivityTypeList({ dispatch, commit, state }) {
            axios.get("Get/ListActivityType")
            .then(response => {
                state.ActivityType = []
                let data = response.data;
                for (let key in data) {
                    data[key].key = key;
                    commit("updateActivityTypeList", data[key]);
                }
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        getAssistantTypeList({ dispatch, commit, state }) {
            axios.get("Get/ListAssistantType")
            .then(response => {
                state.AssistantType = []
                let data = response.data;
                for (let key in data) {
                    data[key].key = key;
                    commit("updateAssistantTypeList", data[key]);
                }
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        getOrdersHistory({ commit, state, dispatch }, searchData) {
            //Talep Verilerini yükle
            axios.get("Get/ListOrders?" + "OrderType=" + searchData.OrderType + "&BeginDate=" + searchData.BeginDate + 
                "&EndDate=" + searchData.EndDate + "&OrderStatus=" + searchData.OrderStatus + "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
            .then(response => {
                state.Orders = []
                let data = response.data;
                
                if(data.length > 0) {
                    for (let key in data) {
                        data[key].key = key;
                        commit("updateOrderList", data[key]);
                    }
                } else {
                    dispatch("sessionControl");
                }
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
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
        setMansionSearch({ dispatch, commit, state, getters}, searchData) {
            //Hotel Verilerini çağır
            state.MansionList = []
            axios.get("Set/ListMansions?" + "BeginDate=" + searchData.BeginDate + "&EndDate=" + searchData.EndDate + "&Adults=" + searchData.Adults + 
                "&Kids=" + searchData.Kids + "&IlId=" + searchData.IlId + "&IlceId=" + searchData.IlceId + "&SessionKey=" + state.SessionKey)
            .then(response => {
                    let data = response.data;
                    for (let key in data) {
                        commit("updateMansionList", data[key]);
                    }
                    
                    state.selectedLocation.IlId = searchData.IlId
                    state.selectedLocation.IlceId = searchData.IlceId
                    return getters.getMansionsByLocation
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        SetMansionOrder({ state, dispatch }, MansionOrder) {
            //Hotel Seçili İsteği gönder
            axios.post("Set/AddMansionOrder?" + "MansionId=" + MansionOrder.MansionId + "&BeginDate=" + MansionOrder.BeginDate + "&EndDate=" + MansionOrder.EndDate + 
                "&Adults=" + MansionOrder.Adults + "&Kids=" + MansionOrder.Kids + "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
            .then(response => {
                let data = response.data;
                
                if(data > 0) {
                    // return data
                    dispatch("resultRoute", MansionOrder.ResultText)
                } else {
                    dispatch("sessionControl");
                }
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        SetTransferOrder({ state, dispatch }, TransferOrder) {
            axios.post("Set/AddTransferOrder?" + "Description='" + TransferOrder.Description + "'&IlId=" + TransferOrder.IlId + "&IlceId=" + TransferOrder.IlceId + 
                "&AirportId=" + TransferOrder.AirportId + "&Adults=" + TransferOrder.Adults + "&Kids=" + TransferOrder.Kids + "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
            .then(response => {
                let data = response.data;

                if(data > 0) {
                    // return data
                    dispatch("resultRoute", TransferOrder.ResultText)
                } else {
                    dispatch("sessionControl");
                }
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        SetRentOrder({ state, dispatch }, RentOrder) {
            axios.post("Set/AddRentOrder?" + "VehicleId=" + RentOrder.VehicleId + "&IlId=" + RentOrder.IlId + "&IlceId=" + RentOrder.IlceId + "&BeginDate=" + RentOrder.BeginDate + 
                "&EndDate=" + RentOrder.EndDate + "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
            .then(response => {
                let data = response.data;
                
                if(data > 0) {
                    // return data
                    dispatch("resultRoute", RentOrder.ResultText)
                } else {
                    dispatch("sessionControl");
                }
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        SetRestaurantOrder({ state, dispatch }, RestaurantOrder) {
            axios.post("Set/AddRestaurantOrder?" + "RestaurantId=" + RestaurantOrder.RestaurantId + "&RequestDate=" + RestaurantOrder.RequestDate + 
                "&Adults=" + RestaurantOrder.Adults + "&Kids=" + RestaurantOrder.Kids + "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
            .then(response => {
                let data = response.data;
                
                if(data > 0) {
                    // return data
                    dispatch("resultRoute", RestaurantOrder.ResultText)
                } else {
                    dispatch("sessionControl");
                }
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        SetActivityOrder({ state, dispatch }, ActivityOrder) {
            axios.post("Set/AddActivityOrder?" + "ActivityTypeId=" + ActivityOrder.ActivityTypeId + "&IlId=" + ActivityOrder.IlId + "&IlceId=" + ActivityOrder.IlceId + 
                "&RequestDate=" + ActivityOrder.RequestDate + "&Adults=" + ActivityOrder.Adults + "&Kids=" + ActivityOrder.Kids + "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
            .then(response => {
                let data = response.data;
                
                if(data > 0) {
                    // return data
                    dispatch("resultRoute", ActivityOrder.ResultText)
                } else {
                    dispatch("sessionControl");
                }
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        SetAssistantOrder({ state, dispatch }, AssistantOrder) {
            axios.post("Set/AddAssistantOrder?" + "AssistantTypeId=" + AssistantOrder.AssistantTypeId + "&IlId=" + AssistantOrder.IlId + "&IlceId=" + AssistantOrder.IlceId + 
                "&RequestDate=" + AssistantOrder.RequestDate + "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
            .then(response => {
                let data = response.data;
                
                if(data > 0) {
                    // return data
                    dispatch("resultRoute", AssistantOrder.ResultText)
                } else {
                    dispatch("sessionControl");
                }
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        SetCleanerOrder({ state, dispatch }, CleanerOrder) {
            axios.post("Set/AddCleanerOrder?" + "WomanMan=" + CleanerOrder.WomanMan + "&HomeTextiles=" + CleanerOrder.HomeTextiles + "&ChildProduct=" + CleanerOrder.ChildProduct + 
                "&RequestDate=" + CleanerOrder.RequestDate + "&UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
            .then(response => {
                let data = response.data;
                
                if(data > 0) {
                    // return data
                    dispatch("resultRoute", CleanerOrder.ResultText)
                } else {
                    dispatch("sessionControl");
                }
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        
        Register({ commit }, registerData ) {
            return axios.post("Session/Register?" + "UserName=" + registerData.UserName + "&Password=" + registerData.Password + 
                "&Mail=" + registerData.Mail + "&FirstName=" + registerData.FirstName + "&LastName=" + registerData.LastName + 
                "&DateOfBirth=" + registerData.DateOfBirth + "&Address=" + registerData.Address + "&PhoneNumber=" + registerData.PhoneNumber + 
                "&RoleId=" + registerData.RoleId + "&PossessionId=" + registerData.PossessionId + "&BeginDate=" + registerData.BeginDate +
                "&EndDate=" + registerData.EndDate + "&Info=" + registerData.Info + "&IsApproved=" + registerData.IsApproved)
            .then(response => {
                let data = response.data;
                
                localStorage.setItem("RoleId", data.RoleId)
                localStorage.setItem("Session", data.Session)
                localStorage.setItem("UserId", data.UserId)
                localStorage.setItem("BookingId", data.BookingId)
                localStorage.setItem("PossessionId", data.PossessionId)
                commit("setSession", data)
            })
        },
        RegisterSecondary({ dispatch, state }, registerData ) {
            return axios.post("User/RegisterSecondary?" + "UserName=" + registerData.UserName + "&Password=" + registerData.Password + 
                "&Mail=" + registerData.Mail + "&FirstName=" + registerData.FirstName + "&LastName=" + registerData.LastName + 
                "&Language=" + registerData.Language + "&DateOfBirth=" + registerData.DateOfBirth + "&Address=" + registerData.Address + 
                "&PhoneNumber=" + registerData.PhoneNumber + "&RoleId=" + registerData.RoleId + "&SessionKey=" + state.SessionKey)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        UpdateSecondary({ dispatch, state }, registerData ) {
            return axios.post("User/UpdateSecondary?" + "&UserId=" + registerData.UserId + "&Password=" + registerData.Password + 
                "&FirstName=" + registerData.FirstName + "&LastName=" + registerData.LastName + "&Language=" + registerData.Language +
                "&DateOfBirth=" + registerData.DateOfBirth + "&Address=" + registerData.Address + 
                "&PhoneNumber=" + registerData.PhoneNumber + "&RoleId=" + registerData.RoleId + "&SessionKey=" + state.SessionKey)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        ListSecondary({ dispatch, commit, state }) {
            state.SecondaryList = []
            axios.get("User/ListSecondary?" + "UserId=" + state.loginUserId + "&SessionKey=" + state.SessionKey)
            .then(response => {
                let data = response.data
                for (let key in data) {
                    commit("updateSecondary", data[key]);
                }
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        GetSelfInfo({ dispatch, state }) {
            return axios.get("User/GetSelfInfo?" + "SessionKey=" + state.SessionKey)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        UpdateSelf({ dispatch, state }, registerData ) {
            return axios.post("User/UpdateSelf?" + "Password=" + registerData.Password + "&FirstName=" + registerData.FirstName + "&LastName=" + registerData.LastName + 
                "&Language=" + registerData.Language + "&DateOfBirth=" + registerData.DateOfBirth + "&Address=" + registerData.Address + 
                "&PhoneNumber=" + registerData.PhoneNumber + "&RoleId=" + registerData.RoleId + "&SessionKey=" + state.SessionKey)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                dispatch("SetError", error)
            })
        },
        
        //Mülk Sayfası
        GetPropertyInfo({ dispatch, state }) {
            return axios.get("Property/PropertyInfo?" + "PossessionId=" + state.PossessionId + "&SessionKey=" + state.SessionKey)
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    dispatch("SetError", error)
                })
        },
        GetBookingHistory({ dispatch, state }) {
            return axios.get("Property/BookingHistory?" + "PossessionId=" + state.PossessionId + "&SessionKey=" + state.SessionKey)
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    dispatch("SetError", error)
                })
        },
        SetPossessionType({ dispatch, state }, PossessionType ) {
            return axios.post("Property/SetPossessionType?" + "PossessionId=" + state.PossessionId + "&PossessionType=" + PossessionType + "&SessionKey=" + state.SessionKey)
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    dispatch("SetError", error)
                })
        },
        GetRentableInfo({ dispatch, state }) {
            return axios.get("Property/RentableInfo?" + "PossessionId=" + state.PossessionId + "&SessionKey=" + state.SessionKey)
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    dispatch("SetError", error)
                })
        },
        SetRentable({ dispatch, state }, RentData ) {
            return axios.post("Property/AddRentable?" + "PossessionId=" + state.PossessionId + "&Year=" + RentData.Year + 
                "&Info=" + RentData.Info + "&timeList=" + RentData.TimeList + "&SessionKey=" + state.SessionKey)
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    dispatch("SetError", error)
                })
        },

        //No Session
        ListMansionsNS({ commit, state }) {
            axios.get("Property/ListMansionsNS")
            .then(response => {
                state.Mansions = []
                let data = response.data;
                for (let key in data) {
                    commit("updateMansions", data[key]);
                }
            })
        },
        ListBlocksNS({ commit, state }, MansionId) {
            axios.get("Property/ListBlocksNS?MansionId=" + MansionId)
            .then(response => {
                state.Blocks = []
                let data = response.data;
                for (let key in data) {
                    commit("updateBlocks", data[key]);
                }
            })
        },
        ListPossessionsNS({ commit, state }, Payload) {
            axios.get("Property/ListPossessionsNS?MansionId=" + Payload.MansionId + "&BlockId=" + Payload.BlockId)
            .then(response => {
                state.Possessions = []
                let data = response.data;
                for (let key in data) {
                    commit("updatePossessions", data[key]);
                }
            })
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
            return { roleId: state.roleId, SessionKey: state.SessionKey, 
                loginUserId: state.loginUserId, BookingId: state.BookingId, 
                PossessionId: state.PossessionId,}
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
        getMansionsByLocation(state) {
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
        getOrderStatus(state) {
            return state.OrderStatus;
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