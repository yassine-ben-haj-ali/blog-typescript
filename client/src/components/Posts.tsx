import { useEffect } from "react";
import Post from "./Post";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { fetchPosts } from "../slices/postSlice";

const Posts = () => {
  const { error, loading, data } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <div className="posts">
      {loading && <div>...loading</div>}
      {!loading && error ? <div>{error}</div> : null}
      {!loading && data.length
        ? data.map((p, idx) => <Post post={p} key={idx} />)
        : null}
    </div>
  );
};

export default Posts;
