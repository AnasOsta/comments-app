export async function handleReply(
  commentId: string,
  commentText: string,
  parentUsername: string
) {
  const res = await fetch("/api/comment", {
    method: "POST",
    body: JSON.stringify({
      comment: commentText,
      parentId: commentId,
      parentUsername,
    }),
  });
  if (res.ok) {
    window.location.reload();
  } else {
    console.log(res);
  }
}
export async function handleEdit(commentId: string, commentText: string) {
  const res = await fetch("/api/comment", {
    method: "PUT",
    body: JSON.stringify({ content: commentText, id: commentId }),
  });
  if (res.ok) {
    window.location.reload();
  } else {
    console.log(res);
  }
}

export async function handleAddComment(comment: string) {
  if (!comment) return;
  const res = await fetch("/api/comment", {
    method: "POST",
    body: JSON.stringify({ comment }),
  });
  if (res.ok) {
    window.location.reload();
  } else {
    console.log(res);
  }
}
export async function handleDelete(commentId: string) {
  const res = await fetch("/api/comment", {
    method: "DELETE",
    body: JSON.stringify({ id: commentId }),
  });
  if (res.ok) {
    window.location.reload();
  } else {
    console.log(res);
  }
}

export async function plusLike(id: string) {
  const res = await fetch("/api/like", {
    method: "POST",
    body: JSON.stringify({ id, method: "PLUS" }),
  });
  if (res.ok) {
    window.location.reload();
  } else {
    console.log(res);
  }
}

export async function minusLike(id: string) {
  const res = await fetch("/api/like", {
    method: "POST",
    body: JSON.stringify({ id, method: "MINUS" }),
  });
  if (res.ok) {
    window.location.reload();
  } else {
    console.log(res);
  }
}
