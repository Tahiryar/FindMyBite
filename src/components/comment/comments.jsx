import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const CommentsContainer = styled.div`
  max-width: 800px;
  margin: 60px auto;
  padding: 40px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.6s ease-out;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    margin: 40px 20px;
    border-radius: 20px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Divider = styled.div`
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  margin: 20px auto;
`;

const CommentForm = styled.div`
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 40px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  animation: ${slideIn} 0.5s ease-out;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 20px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 16px;
  font-size: 1rem;
  font-family: inherit;
  color: #333;
  background: #fff;
  resize: none;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #a0a0c0;
    font-weight: 500;
  }
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const CharCount = styled.span`
  font-size: 0.9rem;
  color: ${props => props.count > 280 ? '#ff4757' : '#666'};
  font-weight: ${props => props.count > 280 ? '700' : '500'};
`;

const SubmitButton = styled.button`
  padding: 14px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CommentCard = styled.div`
  background: #fff;
  border-radius: 18px;
  padding: 25px;
  border: 1px solid #eaeaea;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    border-color: rgba(102, 126, 234, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

const UserBadge = styled.span`
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  margin-top: 4px;
  width: fit-content;
`;

const Date = styled.small`
  color: #888;
  font-size: 0.9rem;
  font-weight: 500;
`;

const CommentText = styled.p`
  font-size: 1.05rem;
  line-height: 1.6;
  color: #333;
  margin: 0;
  padding-left: 62px;
  
  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 15px;
  }
`;

const CommentActions = styled.div`
  display: flex;
  gap: 15px;
  padding-left: 62px;
  margin-top: 15px;
  
  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background: #f8f9fa;
    color: #667eea;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 30px;
`;

const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Ali Khan",
      text: "Amazing food! The quality and presentation were top-notch. Highly recommended for anyone looking for authentic taste 👌",
      date: "2 hours ago",
      badge: "Verified Buyer"
    },
    {
      id: 2,
      user: "Sara Ahmed",
      text: "Delivery was surprisingly fast! The food arrived hot and fresh. The flavors were perfectly balanced - will definitely order again!",
      date: "5 hours ago",
      badge: "Regular Customer"
    },
    {
      id: 3,
      user: "Bilal Sheikh",
      text: "Portion size could be more generous for the price, but the taste makes up for it. The seasoning was just perfect ⭐⭐⭐⭐⭐",
      date: "1 day ago",
      badge: "Food Critic"
    },
    {
      id: 4,
      user: "Fatima Noor",
      text: "Absolutely loved the presentation! The food not only tasted amazing but looked like it came from a 5-star restaurant. Worth every penny!",
      date: "2 days ago",
      badge: "Verified Buyer"
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async () => {
    if (newComment.trim() === "" || newComment.length > 280) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newData = {
      id: Date.now(),
      user: "You",
      text: newComment,
      date: "Just now",
      badge: "New Customer"
    };

    setComments([newData, ...comments]);
    setNewComment("");
    setIsSubmitting(false);
  };

  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleAdd();
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const formatDate = (dateString) => {
    return dateString;
  };

  const handleLike = (id) => {
    // Like functionality
    console.log(`Liked comment ${id}`);
  };

  const handleReply = (id) => {
    // Reply functionality
    console.log(`Replying to comment ${id}`);
  };

  return (
    <CommentsContainer>
      <Header>
        <Title>Customer Reviews</Title>
        <Subtitle>See what our community is saying about their experience</Subtitle>
        <Divider />
      </Header>

      {/* Comment Form */}
      <CommentForm>
        <TextArea
          placeholder="Share your thoughts... What did you love about your experience? (Max 280 characters)"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={handleKeyPress}
          maxLength={280}
        />
        <FormFooter>
          <CharCount count={newComment.length}>
            {280 - newComment.length} characters remaining
          </CharCount>
          <SubmitButton 
            onClick={handleAdd} 
            disabled={newComment.trim() === "" || newComment.length > 280 || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner">↻</span>
                Posting...
              </>
            ) : (
              <>
                <span style={{ fontSize: '1.2rem' }}>✍️</span>
                Post Review
              </>
            )}
          </SubmitButton>
        </FormFooter>
      </CommentForm>

      {/* Comments List */}
      <CommentsList>
        {comments.length === 0 ? (
          <EmptyState>
            <EmptyIcon>💬</EmptyIcon>
            <EmptyText>No reviews yet. Be the first to share your experience!</EmptyText>
          </EmptyState>
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment.id}>
              <CommentHeader>
                <UserInfo>
                  <Avatar>
                    {getInitials(comment.user)}
                  </Avatar>
                  <UserDetails>
                    <UserName>{comment.user}</UserName>
                    {comment.badge && <UserBadge>{comment.badge}</UserBadge>}
                  </UserDetails>
                </UserInfo>
                <Date>{formatDate(comment.date)}</Date>
              </CommentHeader>
              <CommentText>{comment.text}</CommentText>
              <CommentActions>
                <ActionButton onClick={() => handleLike(comment.id)}>
                  👍 Like
                </ActionButton>
                <ActionButton onClick={() => handleReply(comment.id)}>
                  💬 Reply
                </ActionButton>
              </CommentActions>
            </CommentCard>
          ))
        )}
      </CommentsList>
    </CommentsContainer>
  );
};

export default Comments;