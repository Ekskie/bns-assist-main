"use client";
import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { Pill, Send, History, Clock, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function RequestSupplyWidget() {
  const { id: userId, barangay } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [requests, setRequests] = useState([]); // Store request history
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("form"); // 'form' or 'history'

  // Fetch Inventory
  useEffect(() => {
    const fetchInventory = async () => {
        try {
            const res = await fetch("/api/inventory");
            const data = await res.json();
            if(Array.isArray(data)) setInventory(data);
        } catch (err) {
            console.error("Failed to fetch inventory", err);
        }
    };
    fetchInventory();
  }, []);

  // Fetch History
  const fetchHistory = async () => {
    if (!userId) return;
    try {
        // Assuming API supports filtering or returns user specific data
        // If not, we might need to filter client side if the API returns everything (not secure but works for demo)
        // Ideally: /api/request?userId=${userId}
        const res = await fetch(`/api/request`); 
        if (res.ok) {
            const allRequests = await res.json();
            // Filter client-side for now if API returns all
            // Ensure we match the requester ID
            const myRequests = allRequests.filter(req => req.requestedBy === userId).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
            setRequests(myRequests);
        }
    } catch (err) {
        console.error("Failed to fetch history", err);
    }
  };

  useEffect(() => {
    if (view === 'history') {
        fetchHistory();
    }
  }, [view, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItem) return toast.error("Please select an item");
    
    setLoading(true);
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        body: JSON.stringify({
           reqtype: "Supply Request",
           content: `Requesting ${quantity} unit(s) of ${selectedItem}`,
           requestedBy: userId,
           barangay: barangay || "Unknown",
           isdone: false
        }),
      });

      if (res.ok) {
        toast.success("Request sent to Admin");
        setSelectedItem("");
        setQuantity(1);
        setView("history"); // Switch to history view on success
      } else {
        toast.error("Failed to send request");
      }
    } catch (error) {
      toast.error("Error sending request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 font-bold flex items-center gap-2 text-sm uppercase tracking-wide">
          <Pill size={16} className="text-blue-500" /> Request Supplies
        </h3>
        <div className="flex bg-gray-100 rounded-md p-0.5">
            <button 
                onClick={() => setView("form")}
                className={`px-2 py-1 text-[10px] font-medium rounded-sm transition-all ${view === "form" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
                New
            </button>
            <button 
                onClick={() => setView("history")}
                className={`px-2 py-1 text-[10px] font-medium rounded-sm transition-all flex items-center gap-1 ${view === "history" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
                <History size={10} /> History
            </button>
        </div>
      </div>

      {view === "form" ? (
        <form onSubmit={handleSubmit} className="space-y-3 flex-1 flex flex-col justify-center">
            <div>
            <label className="text-xs text-gray-500 font-medium mb-1 block">Item Needed</label>
            <select 
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-700"
            >
                <option value="">-- Select Vitamin/Medicine --</option>
                {inventory.map(item => (
                <option key={item._id} value={item.itemName}>
                    {item.itemName} ({item.unit}) - Avail: {item.quantity}
                </option>
                ))}
            </select>
            </div>

            <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Quantity</label>
                <div className="flex gap-2">
                    <input 
                        type="number" 
                        min="1"
                        placeholder="Qty"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-20 p-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-500"
                    />
                    <button 
                        disabled={loading}
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded text-xs flex items-center justify-center gap-2 transition-colors disabled:bg-blue-400"
                    >
                        {loading ? "Sending..." : <><Send size={14} /> SEND REQUEST</>}
                    </button>
                </div>
            </div>
            
            <p className="text-[10px] text-gray-400 mt-2 text-center">
                Requests are subject to approval by the MNAO Admin.
            </p>
        </form>
      ) : (
        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
            {requests.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <History size={24} className="mb-2 opacity-50" />
                    <p className="text-xs">No request history found.</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {requests.map((req) => (
                        <div key={req._id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-start">
                            <div>
                                <p className="text-xs font-semibold text-gray-800 line-clamp-2">{req.content}</p>
                                <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                                    {new Date(req.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="shrink-0 ml-2">
                                {req.isdone ? (
                                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                                        <CheckCircle size={10} /> Done
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                                        <Clock size={10} /> Pending
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      )}
    </div>
  );
}