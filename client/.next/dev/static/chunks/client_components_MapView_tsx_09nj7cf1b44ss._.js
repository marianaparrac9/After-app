(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/client/components/MapView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapView",
    ()=>MapView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const MapView = ({ events, selectedId, onSelect, origin, destination, showRoute })=>{
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onSelect);
    selectRef.current = onSelect;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapView.useEffect": ()=>{
            let map = null;
            let cancelled = false;
            const start = {
                "MapView.useEffect.start": async ()=>{
                    const L = await __turbopack_context__.A("[project]/client/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript, async loader)");
                    await __turbopack_context__.A("[project]/client/node_modules/leaflet/dist/leaflet.css [app-client] (css, async loader)");
                    if (!ref.current || cancelled) return;
                    ref.current.innerHTML = "";
                    const center = destination || origin || {
                        lat: 3.4516,
                        lng: -76.532
                    };
                    map = L.map(ref.current, {
                        zoomControl: false
                    }).setView([
                        center.lat,
                        center.lng
                    ], 14);
                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution: "&copy; OpenStreetMap"
                    }).addTo(map);
                    events.forEach({
                        "MapView.useEffect.start": (event)=>{
                            const html = `<div class="map-label">${event.mapLabel === "Rooftop" ? "♪ " : event.mapLabel === "Drinks" ? "🍸 " : ""}${event.mapLabel}</div>`;
                            const icon = L.divIcon({
                                className: "",
                                html,
                                iconSize: [
                                    110,
                                    28
                                ],
                                iconAnchor: [
                                    55,
                                    14
                                ]
                            });
                            const marker = L.marker([
                                event.latitude,
                                event.longitude
                            ], {
                                icon
                            }).addTo(map);
                            marker.on("click", {
                                "MapView.useEffect.start": ()=>selectRef.current?.(event.id)
                            }["MapView.useEffect.start"]);
                            if (selectedId === event.id) {
                                L.circleMarker([
                                    event.latitude,
                                    event.longitude
                                ], {
                                    radius: 18,
                                    color: "#b026ff",
                                    fillColor: "#b026ff",
                                    fillOpacity: 0.22
                                }).addTo(map);
                            }
                        }
                    }["MapView.useEffect.start"]);
                    if (origin) {
                        const pin = L.divIcon({
                            className: "",
                            html: `<div style="width:18px;height:18px;border-radius:50%;background:#c218d4;border:3px solid #fff;box-shadow:0 0 0 8px rgba(194,24,212,.25)"></div>`,
                            iconSize: [
                                18,
                                18
                            ],
                            iconAnchor: [
                                9,
                                9
                            ]
                        });
                        L.marker([
                            origin.lat,
                            origin.lng
                        ], {
                            icon: pin
                        }).addTo(map);
                    }
                    if (showRoute && origin && destination) {
                        const mid = {
                            lat: (origin.lat + destination.lat) / 2 + 0.003,
                            lng: (origin.lng + destination.lng) / 2 - 0.004
                        };
                        L.polyline([
                            [
                                origin.lat,
                                origin.lng
                            ],
                            [
                                mid.lat,
                                mid.lng
                            ],
                            [
                                destination.lat,
                                destination.lng
                            ]
                        ], {
                            color: "#c218d4",
                            weight: 7,
                            opacity: 0.9
                        }).addTo(map);
                        L.circleMarker([
                            destination.lat,
                            destination.lng
                        ], {
                            radius: 12,
                            color: "#c218d4",
                            fillColor: "#c218d4",
                            fillOpacity: 0.85
                        }).addTo(map);
                        map.fitBounds([
                            [
                                origin.lat,
                                origin.lng
                            ],
                            [
                                destination.lat,
                                destination.lng
                            ]
                        ], {
                            padding: [
                                50,
                                50
                            ]
                        });
                    }
                }
            }["MapView.useEffect.start"];
            void start();
            return ({
                "MapView.useEffect": ()=>{
                    cancelled = true;
                    map?.remove();
                }
            })["MapView.useEffect"];
        }
    }["MapView.useEffect"], [
        events,
        selectedId,
        origin,
        destination,
        showRoute
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        style: {
            height: "100%",
            width: "100%"
        }
    }, void 0, false, {
        fileName: "[project]/client/components/MapView.tsx",
        lineNumber: 112,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(MapView, "XpdU+O18XtXjaoox7k21MbbraPw=");
_c = MapView;
var _c;
__turbopack_context__.k.register(_c, "MapView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/components/MapView.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/client/components/MapView.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=client_components_MapView_tsx_09nj7cf1b44ss._.js.map