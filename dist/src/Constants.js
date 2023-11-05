export var State;
(function (State) {
    State[State["none"] = 0] = "none";
    State[State["open"] = 1] = "open";
    State[State["closed"] = 2] = "closed";
    State[State["reconnecting"] = 3] = "reconnecting";
    State[State["connecting"] = 4] = "connecting";
    State[State["destroyed"] = 5] = "destroyed";
})(State || (State = {}));
export var EventTypes;
(function (EventTypes) {
    EventTypes["open"] = "open";
    EventTypes["closed"] = "closed";
    EventTypes["reconnecting"] = "reconnecting";
    EventTypes["connecting"] = "connecting";
    EventTypes["destroyed"] = "destroyed";
    EventTypes["error"] = "error";
})(EventTypes || (EventTypes = {}));
//# sourceMappingURL=Constants.js.map