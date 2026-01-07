"use client";
import { useFetchFilters } from "@/hooks/useFetchFilters";
import { ArrowRightLeft, Calculator, Ruler } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const WheelCalculators = () => {
  const [activeTab, setActiveTab] = useState("offset");
  const { filters } = useFetchFilters("wheels");

  // Offset/Backspacing Calculator State
  const [offsetWidth, setOffsetWidth] = useState("12");
  const [offsetSign, setOffsetSign] = useState("-");
  const [offsetValue, setOffsetValue] = useState("44");
  const [backspacing, setBackspacing] = useState("4.77");
  // Tire Size Comparison State
  const [tire1, setTire1] = useState({ width: "265", aspect: "75", rim: "16" });
  const [tire2, setTire2] = useState({
    width: "31",
    aspect: "10.5",
    rim: "15",
  });

  // Metric/Standard Conversion State
  const [metricWidth, setMetricWidth] = useState("265");
  const [metricAspect, setMetricAspect] = useState("75");
  const [metricRim, setMetricRim] = useState("16");
  const [standardWidth, setStandardWidth] = useState("31");
  const [standardAspect, setStandardAspect] = useState("10.5");
  const [standardRim, setStandardRim] = useState("15");

  // Bolt Pattern State
  const [boltInput, setBoltInput] = useState("5x114.3");
  const [boltOutput, setBoltOutput] = useState("5x4.50in");
  const [wheelComp, setWheelComp] = useState({
    currentWidth: "13",
    currentOffset: "65",
    currentHeight: "",
    currentTireWidth: "",
    currentDiameter: "19",
    newWidth: "9",
    newOffset: "45",
    newHeight: "",
    newTireWidth: "",
    newDiameter: "19",
  });

  useEffect(() => {
    const w = parseFloat(offsetWidth);
    const o = parseFloat(offsetSign + offsetValue);
    if (!isNaN(w) && !isNaN(o)) {
      const bs = w / 2 + o / 25.4;
      setBackspacing((bs + 0.5).toFixed(2));
    }
  }, [offsetWidth, offsetSign, offsetValue]);

  const calculateWheelClearance = () => {
    const cw = parseFloat(wheelComp.currentWidth) * 25.4;
    const co = parseFloat(wheelComp.currentOffset);
    const nw = parseFloat(wheelComp.newWidth) * 25.4;
    const no = parseFloat(wheelComp.newOffset);

    if (isNaN(cw) || isNaN(co) || isNaN(nw) || isNaN(no)) return null;

    const currentInner = cw / 2 + co;
    const newInner = nw / 2 + no;
    const innerDiff = (newInner - currentInner) / 25.4;

    const currentOuter = cw / 2 - co;
    const newOuter = nw / 2 - no;
    const outerDiff = (newOuter - currentOuter) / 25.4;

    return {
      inner: innerDiff.toFixed(2),
      outer: outerDiff.toFixed(2),
      innerMm: (newInner - currentInner).toFixed(0),
      outerMm: (newOuter - currentOuter).toFixed(0),
    };
  };

  const handleBoltConvert = () => {
    const match = boltInput.toLowerCase().match(/(\d+)x([\d.]+)(mm|in)?/);
    if (!match) return;

    const holes = match[1];
    const val = parseFloat(match[2]);
    const isMetric = boltInput.toLowerCase().includes("mm") || val > 20;

    if (isMetric) {
      setBoltOutput(`${holes}x${(val / 25.4).toFixed(2)}in`);
    } else {
      setBoltOutput(`${holes}x${(val * 25.4).toFixed(1)}mm`);
    }
  };

  const tabs = [
    { id: "offset", label: "Offset/Backspacing" },
    { id: "wheelSize", label: "Wheel Comparison" },
    { id: "tireSize", label: "Tire Comparison" },
    { id: "conversion", label: "Metric/Standard" },
    { id: "boltPattern", label: "Bolt Pattern" },
  ];

  const calculateStandardToMetric = () => {
    const h = parseFloat(standardWidth);
    const w = parseFloat(standardAspect);
    const r = parseFloat(standardRim);
    if (isNaN(h) || isNaN(w) || isNaN(r)) return;

    const widthMm = Math.round(w * 25.4);
    // Sidewall = (Height - Rim) / 2
    const sidewallIn = (h - r) / 2;
    const aspect = Math.round((sidewallIn / w) * 100);

    setMetricWidth(widthMm.toString());
    setMetricAspect(aspect.toString());
    setMetricRim(standardRim);
  };

  const calculateMetricToStandard = () => {
    const w = parseFloat(metricWidth);
    const a = parseFloat(metricAspect);
    const r = parseFloat(metricRim);
    if (isNaN(w) || isNaN(a) || isNaN(r)) return;

    // Height = ((Width * Aspect) / 100) * 2 / 25.4 + Rim
    const height = (((w * a) / 100) * 2) / 25.4 + r;
    const widthIn = w / 25.4;

    setStandardWidth(height.toFixed(1));
    setStandardAspect(widthIn.toFixed(1));
    setStandardRim(metricRim);
  };

  const clearance = calculateWheelClearance();

  const getTireSpecs = (t: any) => {
    let height, width;
    if (parseFloat(t.aspect) > 20) {
      // Metric calculation
      width = parseFloat(t.width) / 25.4;
      height = width * (parseFloat(t.aspect) / 100) * 2 + parseFloat(t.rim);
    } else {
      // Standard/Flotation calculation
      height = parseFloat(t.width);
      width = parseFloat(t.aspect);
    }
    return {
      height: height || 0,
      width: width || 0,
      rim: parseFloat(t.rim) || 0,
    };
  };
  const t1 = getTireSpecs(tire1);
  const t2 = getTireSpecs(tire2);
  const heightDiff = t2.height - t1.height;
  const widthDiff = t2.width - t1.width;
  const diamDiff = t2.rim - t1.rim;

  const handleBsChange = (val: any) => {
    setBackspacing(val);
    const w = parseFloat(offsetWidth);
    const bs = parseFloat(val);
    if (!isNaN(w) && !isNaN(bs)) {
      const o = (bs - w / 2) * 25.4;
      setOffsetSign(o >= 0 ? "+" : "-");
      setOffsetValue(Math.abs(o).toFixed(0));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              WHEEL & TIRE TOOLS
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-bold uppercase tracking-wider border-b-4 transition-all ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
          {/* TAB: OFFSET */}
          {activeTab === "offset" && (
            <div className="animate-in fade-in duration-500 text-center">
              <h2 className="text-xl font-bold uppercase mb-4 tracking-wide">
                Offset/Backspacing Calculator
              </h2>
              <p className="text-sm text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
                Wondering how much backspacing you have with your current or
                desired offset? Let us help you make sure you have the perfect
                stance. What is backspacing and offset? Check out this page to
                help you understand the differences:{" "}
                <span className="text-emerald-500 cursor-pointer hover:underline">
                  Click Here
                </span>
              </p>

              <div className="max-w-xs mx-auto space-y-3 mb-8">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold">Width (In)</label>
                  <select
                    value={offsetWidth}
                    onChange={(e) => setOffsetWidth(e.target.value)}
                    className="w-24 p-1.5 border border-gray-400 bg-white"
                  >
                    {filters?.width?.map((f) => {
                      return (
                        <option key={f.value} value={f.value}>
                          {f.value}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold">Offset (Mm)</label>
                  <div className="flex gap-1">
                    <select
                      value={offsetSign}
                      onChange={(e) => setOffsetSign(e.target.value)}
                      className="w-12 p-1.5 border border-gray-400 bg-white"
                    >
                      <option value="-">-</option>
                      <option value="+">+</option>
                    </select>
                    <input
                      type="text"
                      value={offsetValue}
                      onChange={(e) => setOffsetValue(e.target.value)}
                      className="w-16 p-1.5 border border-gray-400 text-center"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold">Backspacing (In)</label>
                  <input
                    type="text"
                    value={backspacing}
                    onChange={(e) => handleBsChange(e.target.value)}
                    className="w-24 p-1.5 border border-gray-400 text-center"
                  />
                </div>
              </div>

              <button className="bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-3 px-10 uppercase text-sm tracking-widest mb-12 transition-colors">
                Offset/Backspacing Information
              </button>

              {/* Offset Diagrams */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4 border-t pt-10">
                <div className="flex flex-col items-center">
                  <h3 className="text-xs font-black uppercase mb-4 tracking-tighter">
                    Large Positive Offset Wheel
                  </h3>
                  <p className="text-[9px] text-gray-500 mb-4 uppercase italic">
                    (Positive offset pushes the wheel INSIDE the fender)
                  </p>
                  <div className="w-full max-w-[250px] aspect-square relative border-x border-gray-200">
                    <img
                      src="https://images.customwheeloffset.com/web/positive-offset.png"
                      alt="Positive Offset Diagram"
                      className="w-full h-full object-contain opacity-80"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    {/* Fallback SVG for diagram structure if image link is dead */}
              {/* <div className="absolute inset-0 flex items-center justify-center -z-10 text-[10px] font-bold text-gray-300">
                      HUB TOWARD FACE
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center border-l border-gray-100 pl-4">
                  <h3 className="text-xs font-black uppercase mb-4 tracking-tighter">
                    Large Negative Offset Wheel
                  </h3>
                  <p className="text-[9px] text-gray-500 mb-4 uppercase italic">
                    (Negative offset pushes the wheel OUT from the fender)
                  </p>
                  <div className="w-full max-w-[250px] aspect-square relative border-x border-gray-200">
                    <img
                      src="https://images.customwheeloffset.com/web/negative-offset.png"
                      alt="Negative Offset Diagram"
                      className="w-full h-full object-contain opacity-80"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <div className="absolute inset-0 flex items-center justify-center -z-10 text-[10px] font-bold text-gray-300">
                      HUB TOWARD REAR
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          )}

          {/* TAB: WHEEL COMPARISON */}
          {activeTab === "wheelSize" && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-xl font-bold text-center mb-2 uppercase">
                Wheel/Tire Size Comparison and Clearance Calculator
              </h2>
              <p className="text-sm text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                Looking to upgrade your stance and want to make sure you have
                enough room? Use this calculator to make sure your future setup
                will fit! To start, plug in your current wheel width, offset,
                height, width, and diameter in comparison to a new setup, and it
                will give you the difference in clearance and positioning.
              </p>

              <div className="overflow-x-auto mb-10">
                <table className="w-full max-w-4xl mx-auto text-sm">
                  <thead>
                    <tr className="text-gray-500">
                      <th className="pb-2"></th>
                      <th className="pb-2 font-normal">Wheel Width (In)</th>
                      <th className="pb-2 font-normal">Wheel Offset (Mm)</th>
                      <th className="pb-2 font-normal">Height</th>
                      <th className="pb-2 font-normal">Width</th>
                      <th className="pb-2 font-normal">Diameter</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr>
                      <td className="pr-4 py-2 font-bold text-right">
                        Current
                      </td>
                      <td className="px-1">
                        <input
                          type="text"
                          value={wheelComp.currentWidth}
                          onChange={(e) =>
                            setWheelComp({
                              ...wheelComp,
                              currentWidth: e.target.value,
                            })
                          }
                          className="w-full border border-gray-400 p-1.5 text-center"
                        />
                      </td>
                      <td className="px-1">
                        <input
                          type="text"
                          value={wheelComp.currentOffset}
                          onChange={(e) =>
                            setWheelComp({
                              ...wheelComp,
                              currentOffset: e.target.value,
                            })
                          }
                          className="w-full border border-gray-400 p-1.5 text-center"
                        />
                      </td>
                      <td className="px-1">
                        <select
                          value={wheelComp.currentHeight}
                          onChange={(e) => {
                            setWheelComp({
                              ...wheelComp,
                              currentHeight: e.target.value,
                            });
                          }}
                          className="w-full border border-gray-400 p-1.5"
                        >
                          <option value=""></option>
                          <option value="25">25"</option>
                          <option value="26">26"</option>
                          <option value="27">27"</option>
                          <option value="29">29"</option>
                          <option value="30">30"</option>
                          <option value="31">31"</option>
                          <option value="32">32"</option>
                          <option value="33">33"</option>
                          <option value="35">35"</option>
                          <option value="36">36"</option>
                          <option value="37">37"</option>
                          <option value="38">38"</option>
                          <option value="40">40"</option>
                          <option value="42">42"</option>
                          <option value="145">145</option>
                          <option value="155">155</option>
                          <option value="165">165</option>
                          <option value="175">175</option>
                          <option value="185">185</option>
                          <option value="195">195</option>
                          <option value="205">205</option>
                          <option value="215">215</option>
                          <option value="225">225</option>
                          <option value="235">235</option>
                          <option value="245">245</option>
                          <option value="255">255</option>
                          <option value="265">265</option>
                          <option value="275">275</option>
                          <option value="285">285</option>
                          <option value="295">295</option>
                          <option value="305">305</option>
                          <option value="315">315</option>
                          <option value="325">325</option>
                          <option value="335">335</option>
                          <option value="345">345</option>
                          <option value="355">355</option>
                          <option value="375">375</option>
                          <option value="395">395</option>
                        </select>
                      </td>
                      <td className="px-1">
                        <select
                          value={wheelComp.currentWidth}
                          onChange={(e) => {
                            setWheelComp({
                              ...wheelComp,
                              currentWidth: e.target.value,
                            });
                          }}
                          className="w-full border border-gray-400 p-1.5"
                        >
                          {filters?.width?.map((f) => {
                            return (
                              <option key={f.value} value={f.value}>
                                {f.value}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td className="px-1">
                        <select
                          className="w-full border border-gray-400 p-1.5"
                          value={wheelComp.currentDiameter}
                          onChange={(e) =>
                            setWheelComp({
                              ...wheelComp,
                              currentDiameter: e.target.value,
                            })
                          }
                        >
                          {filters?.diameter?.map((f) => {
                            return (
                              <option key={f.value} value={f.value}>
                                {f.value}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-4 py-2 font-bold text-right">New</td>
                      <td className="px-1">
                        <input
                          type="text"
                          value={wheelComp.newWidth}
                          onChange={(e) =>
                            setWheelComp({
                              ...wheelComp,
                              newWidth: e.target.value,
                            })
                          }
                          className="w-full border border-gray-400 p-1.5 text-center"
                        />
                      </td>
                      <td className="px-1">
                        <input
                          type="text"
                          value={wheelComp.newOffset}
                          onChange={(e) =>
                            setWheelComp({
                              ...wheelComp,
                              newOffset: e.target.value,
                            })
                          }
                          className="w-full border border-gray-400 p-1.5 text-center"
                        />
                      </td>
                      <td className="px-1">
                        <select
                          value={wheelComp.newHeight}
                          onChange={(e) => {
                            setWheelComp({
                              ...wheelComp,
                              newHeight: e.target.value,
                            });
                          }}
                          className="w-full border border-gray-400 p-1.5"
                        >
                          <option value=""></option>
                          <option value="25">25"</option>
                          <option value="26">26"</option>
                          <option value="27">27"</option>
                          <option value="29">29"</option>
                          <option value="30">30"</option>
                          <option value="31">31"</option>
                          <option value="32">32"</option>
                          <option value="33">33"</option>
                          <option value="35">35"</option>
                          <option value="36">36"</option>
                          <option value="37">37"</option>
                          <option value="38">38"</option>
                          <option value="40">40"</option>
                          <option value="42">42"</option>
                          <option value="145">145</option>
                          <option value="155">155</option>
                          <option value="165">165</option>
                          <option value="175">175</option>
                          <option value="185">185</option>
                          <option value="195">195</option>
                          <option value="205">205</option>
                          <option value="215">215</option>
                          <option value="225">225</option>
                          <option value="235">235</option>
                          <option value="245">245</option>
                          <option value="255">255</option>
                          <option value="265">265</option>
                          <option value="275">275</option>
                          <option value="285">285</option>
                          <option value="295">295</option>
                          <option value="305">305</option>
                          <option value="315">315</option>
                          <option value="325">325</option>
                          <option value="335">335</option>
                          <option value="345">345</option>
                          <option value="355">355</option>
                          <option value="375">375</option>
                          <option value="395">395</option>
                        </select>
                      </td>
                      <td className="px-1">
                        <select
                          value={wheelComp.newWidth}
                          onChange={(e) => {
                            setWheelComp({
                              ...wheelComp,
                              newWidth: e.target.value,
                            });
                          }}
                          className="w-full border border-gray-400 p-1.5"
                        >
                          {filters?.width?.map((f) => {
                            return (
                              <option key={f.value} value={f.value}>
                                {f.value}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td className="px-1">
                        <select
                          className="w-full border border-gray-400 p-1.5"
                          value={wheelComp.newDiameter}
                          onChange={(e) =>
                            setWheelComp({
                              ...wheelComp,
                              newDiameter: e.target.value,
                            })
                          }
                        >
                          {filters?.diameter?.map((f) => {
                            return (
                              <option key={f.value} value={f.value}>
                                {f.value}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="max-w-md mx-auto space-y-3 mb-10">
                <div className="flex justify-between border-b pb-1">
                  <span className="font-bold">Inner Clearance:</span>
                  <span className="text-gray-700">
                    {clearance?.innerMm}mm{" "}
                    {parseFloat(clearance?.inner || "0.0") > 0
                      ? "closer"
                      : "further"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-bold">Outer Position:</span>
                  <span className="text-gray-700">
                    Sticks out {clearance?.outerMm}mm more
                  </span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-bold">Wheel Diameter Difference:</span>
                  <span className="text-gray-700">
                    {parseFloat(wheelComp.newDiameter) -
                      parseFloat(wheelComp.currentDiameter)}
                    "
                  </span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-bold">Overall Height Difference:</span>
                  <span className="text-gray-700">0"</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-bold">Overall Width Difference:</span>
                  <span className="text-gray-700">0"</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <Link
                  target="_blank"
                  href={`/collections/product-category/wheels?diameter=${wheelComp.currentDiameter}&width=${wheelComp.currentWidth}&offset=${wheelComp.currentOffset}`}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 uppercase text-sm rounded transition-colors"
                >
                  Vehicles with current specs
                </Link>
                <Link
                  target="_blank"
                  href={`/collections/product-category/wheels?diameter=${wheelComp.newDiameter}&width=${wheelComp.newWidth}&offset=${wheelComp.newOffset}`}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 uppercase text-sm rounded transition-colors"
                >
                  Vehicles with these new specs
                </Link>
              </div>
            </div>
          )}

          {/* TAB: TIRE SIZE */}
          {activeTab === "tireSize" && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-xl font-bold text-center mb-8 uppercase tracking-widest">
                Tire Size Comparison Calculator
              </h2>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Input Section */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="font-bold w-16 text-right">Tire 1:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tire1.width}
                          onChange={(e) =>
                            setTire1({ ...tire1, width: e.target.value })
                          }
                          className="w-16 p-2 border border-gray-400 text-center"
                        />
                        <span className="font-bold">/</span>
                        <input
                          type="text"
                          value={tire1.aspect}
                          onChange={(e) =>
                            setTire1({ ...tire1, aspect: e.target.value })
                          }
                          className="w-16 p-2 border border-gray-400 text-center"
                        />
                        <span className="font-bold">R</span>
                        <input
                          type="text"
                          value={tire1.rim}
                          onChange={(e) =>
                            setTire1({ ...tire1, rim: e.target.value })
                          }
                          className="w-16 p-2 border border-gray-400 text-center"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-bold w-16 text-right">Tire 2:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tire2.width}
                          onChange={(e) =>
                            setTire2({ ...tire2, width: e.target.value })
                          }
                          className="w-16 p-2 border border-gray-400 text-center"
                        />
                        <span className="font-bold">/</span>
                        <input
                          type="text"
                          value={tire2.aspect}
                          onChange={(e) =>
                            setTire2({ ...tire2, aspect: e.target.value })
                          }
                          className="w-16 p-2 border border-gray-400 text-center"
                        />
                        <span className="font-bold">R</span>
                        <input
                          type="text"
                          value={tire2.rim}
                          onChange={(e) =>
                            setTire2({ ...tire2, rim: e.target.value })
                          }
                          className="w-16 p-2 border border-gray-400 text-center"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-center lg:justify-start">
                    <button
                      onClick={() => {
                        setTire1({ aspect: "", rim: "", width: "" });
                        setTire2({ aspect: "", rim: "", width: "" });
                      }}
                      className="bg-emerald-500 text-white px-6 py-2 rounded font-bold hover:bg-emerald-600"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="space-y-1 text-sm md:text-base">
                    <p>
                      <strong>Height difference:</strong>{" "}
                      {heightDiff.toFixed(2)}" (
                      {((heightDiff / t1.height) * 100).toFixed(2)}%)
                    </p>
                    <p>
                      <strong>Width difference:</strong> {widthDiff.toFixed(2)}"
                      ({((widthDiff / t1.width) * 100).toFixed(2)}%)
                    </p>
                    <p>
                      <strong>Wheel Diameter difference:</strong> {diamDiff}"
                    </p>
                  </div>
                </div>

                {/* Visual Comparison Section */}
                {
                  <div className="flex justify-center items-end gap-12 pt-8">
                    {/* New Tire */}
                    <div className="flex justify-center items-end gap-16 py-10">
                      {/* Original Tire Container */}
                      {!t1.width ? null : t1.height * 5.5 > 254 ||
                        t1.width * 7.5 > 143 ? (
                        <div>
                          <p>Image not avaliable</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold mb-4 text-gray-600">
                            Original
                          </p>
                          <div
                            className="relative"
                            style={{
                              height: `${t1.height * 5.5}px`,
                              width: `${t1.width * 7.5}px`,
                            }}
                          >
                            {/* Tire Texture Image */}
                            <img
                              src="https://images.customwheeloffset.com/guide/tire-sizes/tire-visualizer.png"
                              alt="Original Tire"
                              className="w-full h-full object-fill"
                            />

                            {/* Width Dimension (Bottom) */}
                            <div className="absolute -bottom-6 inset-x-0 flex flex-col items-center">
                              <div className="w-full border-t border-dashed border-gray-400"></div>
                              <span className="text-[11px] font-bold mt-1">
                                {t1.width.toFixed(2)}
                              </span>
                            </div>

                            {/* Height Dimension (Left) */}
                            <div className="absolute -left-8 inset-y-0 flex items-center">
                              <div className="h-full border-l border-dashed border-gray-400"></div>
                              <span className="text-[11px] font-bold [writing-mode:vertical-lr] rotate-180 ml-1">
                                {t1.height.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* New Tire Container */}
                      {!t2.width ? null : t2.height * 5.5 > 254 ||
                        t2.width * 7.5 > 143 ? (
                        <div>
                          <p>Image not avaliable</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold mb-4 text-gray-600">
                            New
                          </p>
                          <div
                            className="relative"
                            style={{
                              height: `${t2.height * 5.5}px`,
                              width: `${t2.width * 7.5}px`,
                              // Adjust bottom to align tires at the "ground" level
                              marginBottom: `0px`,
                            }}
                          >
                            {/* Tire Texture Image */}
                            <img
                              src="https://images.customwheeloffset.com/guide/tire-sizes/tire-visualizer.png"
                              alt="New Tire"
                              className="w-full h-full object-fill"
                            />

                            {/* Width Dimension (Bottom) */}
                            <div className="absolute -bottom-6 inset-x-0 flex flex-col items-center">
                              <div className="w-full border-t border-dashed border-gray-400"></div>
                              <span className="text-[11px] font-bold mt-1">
                                {t2.width.toFixed(2)}
                              </span>
                            </div>

                            {/* Height Dimension (Right) */}
                            <div className="absolute -right-8 inset-y-0 flex items-center">
                              <div className="h-full border-r border-dashed border-gray-400"></div>
                              <span className="text-[11px] font-bold [writing-mode:vertical-lr] mr-1">
                                {t2.height.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                }
              </div>
            </div>
          )}

          {activeTab === "conversion" && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-black mb-6 uppercase italic">
                Metric / Standard Conversion
              </h2>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Metric to Standard */}
                <div className="space-y-4 p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-800 flex items-center gap-2">
                    <Ruler size={18} /> Metric to Standard
                  </h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={metricWidth}
                      onChange={(e) => setMetricWidth(e.target.value)}
                      className="w-full p-3 border rounded text-center font-mono"
                      placeholder="265"
                    />
                    <span className="font-bold text-gray-400">/</span>
                    <input
                      type="number"
                      value={metricAspect}
                      onChange={(e) => setMetricAspect(e.target.value)}
                      className="w-full p-3 border rounded text-center font-mono"
                      placeholder="75"
                    />
                    <span className="font-bold text-gray-400">R</span>
                    <input
                      type="number"
                      value={metricRim}
                      onChange={(e) => setMetricRim(e.target.value)}
                      className="w-full p-3 border rounded text-center font-mono"
                      placeholder="16"
                    />
                  </div>
                  <button
                    onClick={calculateMetricToStandard}
                    className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors"
                  >
                    CONVERT TO STANDARD
                  </button>
                  <div className="mt-4 text-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">
                      Approximate Standard Size
                    </span>
                    <div className="text-3xl font-black text-blue-900">
                      {standardWidth}" x {standardAspect}" R{standardRim}
                    </div>
                  </div>
                </div>

                {/* Standard to Metric */}
                <div className="space-y-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <Ruler size={18} /> Standard to Metric
                  </h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={standardWidth}
                      onChange={(e) => setStandardWidth(e.target.value)}
                      className="w-full p-3 border rounded text-center font-mono"
                      placeholder="31"
                    />
                    <span className="font-bold text-gray-400">x</span>
                    <input
                      type="number"
                      value={standardAspect}
                      onChange={(e) => setStandardAspect(e.target.value)}
                      className="w-full p-3 border rounded text-center font-mono"
                      placeholder="10.5"
                    />
                    <span className="font-bold text-gray-400">R</span>
                    <input
                      type="number"
                      value={standardRim}
                      onChange={(e) => setStandardRim(e.target.value)}
                      className="w-full p-3 border rounded text-center font-mono"
                      placeholder="15"
                    />
                  </div>
                  <button
                    onClick={calculateStandardToMetric}
                    className="w-full py-3 bg-gray-800 text-white font-bold rounded hover:bg-gray-900 transition-colors"
                  >
                    CONVERT TO METRIC
                  </button>
                  <div className="mt-4 text-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">
                      Approximate Metric Size
                    </span>
                    <div className="text-3xl font-black text-gray-900">
                      {metricWidth} / {metricAspect} R{metricRim}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-yellow-800 mb-2">
                  How it works:
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1 list-disc ml-5">
                  <li>
                    <strong>Standard:</strong> Measured as (Height in inches) x
                    (Width in inches).
                  </li>
                  <li>
                    <strong>Metric:</strong> Measured as (Width in mm) / (Aspect
                    Ratio %).
                  </li>
                  <li>
                    <strong>Aspect Ratio:</strong> Represents the height of the
                    sidewall as a percentage of the width.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB: BOLT PATTERN */}
          {activeTab === "boltPattern" && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-black mb-6 uppercase italic">
                Bolt Pattern Converter
              </h2>
              <div className="max-w-md mx-auto text-center space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 uppercase">
                    Input Pattern (e.g. 5x114.3 or 5x4.5)
                  </label>
                  <input
                    type="text"
                    value={boltInput}
                    onChange={(e) => setBoltInput(e.target.value)}
                    className="w-full p-4 text-2xl text-center font-mono border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                  />
                </div>
                <button
                  onClick={handleBoltConvert}
                  className="w-full py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowRightLeft size={20} /> CONVERT PATTERN
                </button>
                <div className="p-6 bg-blue-50 rounded-xl">
                  <span className="text-xs font-bold text-blue-400 uppercase">
                    Converted Result
                  </span>
                  <div className="text-4xl font-black text-blue-900 mt-2">
                    {boltOutput}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WheelCalculators;
