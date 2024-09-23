from typing import List
from ..schema import ApprovalRequest

notifications: List[ApprovalRequest] = []

def add_notification(approval_request: ApprovalRequest):
    notifications.append(approval_request)

def remove_notification(approval_request: ApprovalRequest):
    notifications.remove(approval_request)
