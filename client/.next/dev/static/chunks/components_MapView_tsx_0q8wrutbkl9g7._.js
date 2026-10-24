(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/MapView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapView",
    ()=>MapView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const labelPrefix = (label)=>{
    if (label === "Rooftop") return "♪ ";
    if (label === "Drinks") return "🍸 ";
    return "";
};
const MapView = ({ events = [], selectedId, onSelect })=>{
    _s();
    const box = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const onSelectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onSelect);
    onSelectRef.current = onSelect;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapView.useEffect": ()=>{
            if (!box.current || mapRef.current) return;
            const map = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].map(box.current, {
                attributionControl: false
            }).setView([
                3.4516,
                -76.532
            ], 14);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
            mapRef.current = map;
            const pick = {
                "MapView.useEffect.pick": (event)=>{
                    const button = event.target?.closest?.("[data-id]");
                    const id = button?.getAttribute("data-id");
                    if (id) onSelectRef.current?.(id);
                }
            }["MapView.useEffect.pick"];
            box.current.addEventListener("click", pick);
            const frame = requestAnimationFrame({
                "MapView.useEffect.frame": ()=>map.invalidateSize()
            }["MapView.useEffect.frame"]);
            return ({
                "MapView.useEffect": ()=>{
                    cancelAnimationFrame(frame);
                    box.current?.removeEventListener("click", pick);
                    map.remove();
                    mapRef.current = null;
                }
            })["MapView.useEffect"];
        }
    }["MapView.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapView.useEffect": ()=>{
            const map = mapRef.current;
            if (!map) return;
            const layer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].layerGroup().addTo(map);
            events.forEach({
                "MapView.useEffect": (event)=>{
                    const selected = event.id === selectedId;
                    const icon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].divIcon({
                        className: "map-label-icon",
                        html: `<button type="button" data-id="${event.id}" class="map-label${selected ? " selected" : ""}">${labelPrefix(event.mapLabel)}${event.mapLabel}</button>`,
                        iconSize: [
                            0,
                            0
                        ],
                        iconAnchor: [
                            0,
                            0
                        ]
                    });
                    const marker = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].marker([
                        event.latitude,
                        event.longitude
                    ], {
                        icon
                    }).addTo(layer);
                    marker.on("click", {
                        "MapView.useEffect": ()=>onSelectRef.current?.(event.id)
                    }["MapView.useEffect"]);
                    marker.getElement()?.querySelector("button")?.addEventListener("click", {
                        "MapView.useEffect": ()=>{
                            onSelectRef.current?.(event.id);
                        }
                    }["MapView.useEffect"]);
                }
            }["MapView.useEffect"]);
            return ({
                "MapView.useEffect": ()=>{
                    layer.remove();
                }
            })["MapView.useEffect"];
        }
    }["MapView.useEffect"], [
        events,
        selectedId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: box,
        className: "leaflet-map"
    }, void 0, false, {
        fileName: "[project]/components/MapView.tsx",
        lineNumber: 79,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(MapView, "l8SZpFzaZ9yXb3c7h7PCAyJXR/g=");
_c = MapView;
var _c;
__turbopack_context__.k.register(_c, "MapView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/MapView.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/components/MapView.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_MapView_tsx_0q8wrutbkl9g7._.js.map