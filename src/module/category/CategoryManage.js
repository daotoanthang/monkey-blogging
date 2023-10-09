import React, { useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Button } from "../../components/button";
import { Table } from "../../components/table";
import { LabelStatus } from "../../components/label";
import { ActionDelete } from "../../components/action";
import { ActionEdit } from "../../components/action";
import { ActionView } from "../../components/action";
import Swal from "sweetalert2";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { categoryStatus } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const CATEGORY_PER_PAGE = 2;

const CategoryManage = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState("");
  const [total, setTotal] = useState(0);
  const [lastDoc, setLastDoc] = useState();
  // const handleLoadMoreCategory = async () => {
  //   const nextRef = query(
  //     collection(db, "categories"),
  //     startAfter(lastDoc || 0),
  //     limit(CATEGORY_PER_PAGE)
  //   );

  //   onSnapshot(nextRef, (snapshot) => {
  //     let results = [];
  //     snapshot.forEach((doc) => {
  //       results.push({
  //         id: doc.id,
  //         ...doc.data(),
  //       });
  //     });
  //     setCategoryList([...categoryList, ...results]);
  //   });
  //   const documentSnapshots = await getDocs(nextRef);
  //   const lastVisible =
  //     documentSnapshots.docs[documentSnapshots.docs.length - 1];
  //   setLastDoc(lastVisible);
  // };
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      // const newRef = filter
      //   ? query(
      //       colRef,
      //       where("name", ">=", filter),
      //       where("name", "<=", filter + "utf8")
      //     )
      //   : query(colRef, limit(CATEGORY_PER_PAGE));
      // const documentSnapshots = await getDocs(newRef);
      // const lastVisible =
      //   documentSnapshots.docs[documentSnapshots.docs.length - 1];
      // onSnapshot(colRef, (snapshot) => {
      //   setTotal(snapshot.size);
      // });
      // console.log(total);

      onSnapshot(colRef, (snapshot) => {
        let result = [];
        // setTotal(Number(snapshot.size));
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategoryList(result);
      });
      // setLastDoc(lastVisible);
    }
    getData();
  }, [filter, total]);

  const handleDeleteCategory = async (docId) => {
    console.log(docId);
    const colRef = doc(db, "categories", docId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button height="60px" to="/manage/add-category">
          Create Category
        </Button>
      </DashboardHeading>
      <div className="mb-10 flex justify-end">
        <input
          type="text"
          placeholder="search category..."
          className="py-4 px-5 border border-gray-300 rounded-lg"
          onChange={handleInputFilter}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td className="italic text-gray-400">{category.slug}</td>
                <td>
                  {category.status === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {category.status === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(category.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* {total > categoryList.length && (
        <div className="mt-10">
          <Button onClick={handleLoadMoreCategory} className="mx-auto">
            Load more
          </Button>
          {total}
        </div>
      )} */}
    </div>
  );
};

export default CategoryManage;
