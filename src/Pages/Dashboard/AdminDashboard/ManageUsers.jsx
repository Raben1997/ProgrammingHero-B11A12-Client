import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const roles = ["user", "moderator", "admin"];

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const { mutateAsync: updateRole } = useMutation({
        mutationFn: async ({ id, role }) => {
            return await axiosSecure.patch(`/users/${id}/role`, { role });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            Swal.fire("Success", "User role updated", "success");
        },
        onError: () => {
            Swal.fire("Error", "Failed to update role", "error");
        },
    });

    const { mutateAsync: deleteUser } = useMutation({
        mutationFn: async (id) => {
            return await axiosSecure.delete(`/users/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            Swal.fire("Deleted", "User removed", "success");
        },
        onError: () => {
            Swal.fire("Error", "Failed to delete user", "error");
        },
    });

    const [filteredRole, setFilteredRole] = useState("all");

    const filteredUsers =
        filteredRole === "all"
            ? users
            : users.filter((user) => user.role === filteredRole);

    const handleRoleChange = async (id, newRole) => {
        await updateRole({ id, role: newRole });
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            await deleteUser(id);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center gap-4 mb-6 max-sm:flex-col max-sm:items-start">
                <h2 className="text-green-600 !p-0 flex-1">Manage Users</h2>
                <div className="flex gap-2 items-center flex-1">
                    <p className="!p-0"><label htmlFor="filter" className="whitespace-nowrap">Filter by Role:</label></p>
                    <select
                        id="filter"
                        className="select select-sm select-bordered max-w-xs"
                        value={filteredRole}
                        onChange={(e) => setFilteredRole(e.target.value)}
                    >
                        <option value="all">All</option>
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {isLoading ? (
                <p className="text-center text-gray-600">Loading users...</p>
            ) : filteredUsers.length === 0 ? (
                <p className="text-center text-gray-600">No users found.</p>
            ) : (
                <div className="overflow-x-auto w-full">
                    <table className="table table-zebra border border-green-200">
                        <thead className="bg-green-100 text-green-600">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Change Role</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td className="whitespace-nowrap">{user.name}</td>
                                    <td className="whitespace-nowrap">{user.email}</td>
                                    <td className="capitalize">{user.role}</td>
                                    <td>
                                        <select
                                            className="select select-sm select-bordered capitalize"
                                            value={user.role}
                                            onChange={(e) =>
                                                handleRoleChange(user._id, e.target.value)
                                            }
                                        >
                                            {roles.map((role) => (
                                                <option key={role} value={role}>
                                                    {role}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn btn-sm btn-error text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default ManageUsers;
